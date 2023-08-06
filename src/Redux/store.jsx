/**
 * Redux Store Configuration
 *
 * This file exports a configured Redux store using the '@reduxjs/toolkit' library.
 * The store includes the specified root reducer and middleware for handling API requests using 'sendExcelCsv' middleware.
 */
import { configureStore } from "@reduxjs/toolkit";
import { sendExcelCsv } from "./DashboardPage/dashboardRtkQuery";
import { rootReducers } from "./Root/rootReducer";

export const store = configureStore({
  reducer: rootReducers.Excelreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sendExcelCsv.middleware),
});
