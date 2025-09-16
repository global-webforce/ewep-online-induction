import { InductionRow } from "@/features/app/inductions/schema";
import { InductionsTable } from "@/features/app/inductions/table";
import { createClient } from "@/utils/supabase/client-server";

export default async function InductionPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  const inductions: InductionRow[] | null = data;

  return <main>{<InductionsTable data={inductions} />}</main>;
}
