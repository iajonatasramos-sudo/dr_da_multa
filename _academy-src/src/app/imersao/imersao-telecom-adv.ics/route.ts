import { icsContent } from "@/lib/imersao";

export const dynamic = "force-static";

export function GET() {
  return new Response(icsContent(), {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
}
