import { InductionFormCreate } from "@/features/inductions";

export default async function Page() {
  return (
    <>
      <h1 className="text-xl font-semibold">Create Induction</h1>
      <InductionFormCreate />
    </>
  );
}
