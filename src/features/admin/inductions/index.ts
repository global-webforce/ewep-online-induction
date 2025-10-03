export { Table as InductionsTable } from "./table/table";
export { FormCreate as InductionFormCreate } from "./forms/form.create";
export { FormUpdate as InductionFormUpdate } from "./forms/form.update";
export { fetchAll as fetchAllInduction } from "./actions/fetch-all";
export { fetchById as fetchInductionById } from "./actions/fetch-by-id";
export type { TableSchema as InductionSchema } from "./types";
export const queryKey = "inductions";
