import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  InductionRow,
  InductionSchema,
} from "@/features/app/inductions/schema";
import { InductionsTable } from "@/features/app/inductions/table";
import { createClientAdmin } from "@/utils/supabase/client-server-admin";

export default async function InductionPage() {
  const supabase = createClientAdmin();
  const { data, error } = await supabase
    .from("inductions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return error;
  }

  const inductions: InductionRow[] | null = data;

  return (
    <main>
      <InductionsTable data={inductions} />
    </main>
  );
}
