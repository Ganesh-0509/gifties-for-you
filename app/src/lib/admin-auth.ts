import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { settingsTable } from "./schema";

const COOKIE = "gfy_admin";
const PBKDF2_ITERATIONS = 210_000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12h

// ---------- password hashing ----------

function toBase64(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return btoa(String.fromCharCode(...arr));
}

function fromBase64(b64: string): Uint8Array {
  return new Uint8Array(
    atob(b64)
      .split("")
      .map((c) => c.charCodeAt(0)),
  );
}

async function pbkdf2Hash(password: string, salt: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return toBase64(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2Hash(password, salt);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64(salt)}$${hash}`;
}

function sameBytes(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const salt = fromBase64(parts[2]);
  const expectedHash = parts[3];
  const actualHash = await pbkdf2Hash(password, salt);
  return sameBytes(actualHash, expectedHash);
}

// ---------- settings-table-backed auth record ----------

interface AuthRecord {
  passwordHash: string | null;
  version: number;
}

async function getAuthRecord(): Promise<AuthRecord> {
  const db = getDb();
  const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "auth")).limit(1).all();
  if (rows.length === 0) return { passwordHash: null, version: 0 };
  try {
    return JSON.parse(rows[0].value);
  } catch {
    return { passwordHash: null, version: 0 };
  }
}

async function saveAuthRecord(record: AuthRecord) {
  const db = getDb();
  await db
    .insert(settingsTable)
    .values({ key: "auth", value: JSON.stringify(record) })
    .onConflictDoUpdate({ target: settingsTable.key, set: { value: JSON.stringify(record) } })
    .run();
}

export async function setAdminPassword(password: string) {
  const current = await getAuthRecord();
  await saveAuthRecord({ passwordHash: await hashPassword(password), version: current.version + 1 });
}

/** Verifies a login attempt: the owner's own set password, or the break-glass ADMIN_PASSWORD env secret. */
export async function verifyLogin(password: string): Promise<boolean> {
  const { env } = getCloudflareContext();
  const record = await getAuthRecord();
  if (record.passwordHash && (await verifyPassword(password, record.passwordHash))) return true;
  if (env.ADMIN_PASSWORD && sameBytes(password, env.ADMIN_PASSWORD)) return true;
  return false;
}

// ---------- session secret (never a hardcoded fallback) ----------

async function getSessionSecret(): Promise<string> {
  const { env } = getCloudflareContext();
  if (env.ADMIN_SESSION_SECRET) return env.ADMIN_SESSION_SECRET;

  const db = getDb();
  const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "session_secret")).limit(1).all();
  if (rows.length > 0) return rows[0].value;

  const minted = toBase64(crypto.getRandomValues(new Uint8Array(32)));
  await db.insert(settingsTable).values({ key: "session_secret", value: minted }).run();
  return minted;
}

async function sign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toBase64(sig);
}

// ---------- session cookie ----------

export async function createSession() {
  const record = await getAuthRecord();
  const secret = await getSessionSecret();
  const payload = `admin-ok:v${record.version}:${Date.now() + SESSION_TTL_MS}`;
  const signature = await sign(secret, payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, `${payload}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}

async function hasValidSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE)?.value;
  if (!raw) return false;
  const dot = raw.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);

  const secret = await getSessionSecret();
  const expected = await sign(secret, payload);
  if (!sameBytes(expected, signature)) return false;

  const parts = payload.split(":");
  if (parts.length !== 3 || parts[0] !== "admin-ok") return false;
  const version = Number(parts[1].slice(1));
  const expiresAt = Number(parts[2]);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const record = await getAuthRecord();
  return version === record.version;
}

/** Call at the top of every protected admin page and server action. */
export async function requireAdmin() {
  if (!(await hasValidSession())) redirect("/admin/login");
}

export async function isLoggedIn(): Promise<boolean> {
  return hasValidSession();
}
