import { createClientAdmin } from "@/utils/supabase/client-server-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .select(
      `
    id,
    title,
    description,
    validity_days,
    status,
    created_at,   
    induction_resources (
      id,
      induction_id,
      title,
      content,
      "order",
      quiz,
      created_at
    )`
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
