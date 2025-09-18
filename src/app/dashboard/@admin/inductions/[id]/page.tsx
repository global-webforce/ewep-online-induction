import { SlideMaker } from "@/components/slide-maker/slides/slide-maker";
import { getInductionAction, InductionFormUpdate } from "@/features/inductions";

type Params = Promise<{ id: string }>;
export default async function DefaultDashboardPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const data = await getInductionAction(id);

  return (
    <>
      <h1 className="text-xl font-semibold">{data.title}</h1>

      <SlideMaker value={[]} />

      <InductionFormUpdate id={id} data={data} />
    </>
  );
}
