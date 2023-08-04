/**
 * Root Reducers
 *
 * This file exports an object named 'rootReducers' that contains the Excelreducer to be used as a root reducer in the Redux store.
 * The Excelreducer is imported from the 'excelReducer' in the 'ExcelPage' directory, and it manages Excel-related state in the Redux store.
 */
import { Excelreducer } from "../../ExcelPage/excelReducer";

export const rootReducers = {
  Excelreducer: Excelreducer,
};
