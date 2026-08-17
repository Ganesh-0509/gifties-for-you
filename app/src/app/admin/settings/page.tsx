import { requireAdmin } from "@/lib/admin-auth";
import { getSettings } from "@/lib/catalog";
import { SettingsForm } from "./SettingsForm";
import { PasswordForm } from "./PasswordForm";

export default async function AdminSettings() {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>

      <div className="mt-6">
        <SettingsForm settings={settings} />
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-lg font-semibold text-ink">Change password</h2>
        <div className="mt-3">
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
