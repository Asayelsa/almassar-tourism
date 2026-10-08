// Health endpoint for container health checks.
//
// Checked by docker-compose rather than "/", because "/" renders the full page
// and can pass while the app is degraded — and can fail during warmup for
// reasons that have nothing to do with liveness.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ status: "ok" }, { status: 200 });
}
