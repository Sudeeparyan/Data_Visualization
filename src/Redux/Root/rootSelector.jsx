/**
 * Root Selector
 *
 * This file exports an object named 'rootSelector' that contains the ExcelSelector to access Excel-related data from the Redux store.
 * The ExcelSelector is imported from the 'excelSelector' in the 'ExcelPage' directory, and it provides a selector to extract Excel data from the state.
 */

import { ExcelSelector } from "../DashboardPage/dashboardSelector";

export const rootSelector = {
  ExcelSelector: ExcelSelector,
};
