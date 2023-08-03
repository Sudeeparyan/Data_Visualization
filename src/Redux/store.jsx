import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { sendExcelCsv } from "./ExcelPage/excelRtkQuery";
import { rootReducers } from "./RootReducer/rootReducer";

export const store = configureStore({
  reducer: rootReducers.Excelreducer,
  middleware: getDefaultMiddleware().concat(sendExcelCsv.middleware),
});
