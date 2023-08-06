/**
 * Excel Reducer
 *
 * This file combines two Redux reducers, `Excelreducers` and the `sendExcelCsv` reducer,
 * into a single root reducer named `Excelreducer`.
 */

import Excelreducers from "./dashboardSlice";
import { sendExcelCsv } from "./dashboardRtkQuery";

export const Excelreducer = {
  [sendExcelCsv.reducerPath]: sendExcelCsv.reducer,
  Excel_Csv: Excelreducers,
};
