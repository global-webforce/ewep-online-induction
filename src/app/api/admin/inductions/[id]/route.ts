import { createClient } from "@/utils/supabase/client-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ unwrap params

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // return null or single object on success/error

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
