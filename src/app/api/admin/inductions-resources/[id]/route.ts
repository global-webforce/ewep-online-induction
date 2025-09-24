import { createClient } from "@/utils/supabase/client-server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_resources")
    .select("*")
    .eq("induction_id", params.id); // return null or single object on success/error.
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
