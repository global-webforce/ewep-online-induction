import { getAllInductionAction, InductionsTable } from "@/features/inductions";

export default async function InductionPage() {
  const data = await getAllInductionAction();
  return (
    <main className=" flex flex-col ">
      <div>
        <header className="flex gap-3 min-h-10">
          <h1 className="text-xl font-semibold">Inductions</h1>
        </header>
      </div>

      {<InductionsTable data={data} />}
    </main>
  );
}
