import { configureStore } from "@reduxjs/toolkit";
import { sendExcelCsv } from "./ExcelPage/excelRtkQuery";
import { rootReducers } from "./Root/RootReducer/rootReducer";

export const store = configureStore({
  reducer: rootReducers.Excelreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sendExcelCsv.middleware),
});
