export const runtime = "nodejs";

import { getProductPhotoData } from "@/lib/catalog";
import { dataUrlResponse } from "@/lib/image-response";

export async function GET(_req: Request, props: RouteContext<"/api/product-photo/[id]">) {
  const { id } = await props.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) return new Response(null, { status: 404 });
  const data = await getProductPhotoData(numId);
  return dataUrlResponse(data);
}
