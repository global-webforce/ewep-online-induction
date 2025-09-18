//https://nextjs.org/docs/messages/sync-dynamic-apis\

import SlideTest from "@/components/slide-maker/slides/slide-test";
import { createClient } from "@/utils/supabase/client-server";

//https://github.com/vercel/next.js/issues/74406#issuecomment-2674832576
type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
  //eeeb8173-c969-4f03-9f95-11c6ebc4e48e
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("induction_slides")
    .select("*")

    // Filters
    .eq("induction_id", id);

  if (error) {
    throw Error(error.message);
  }

  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
      <SlideTest />
    </>
  );
}
