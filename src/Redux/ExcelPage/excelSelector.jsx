/**
 * Excel Selector
 *
 * This file defines a selector for extracting Excel-related data from the Redux state using the `reselect` library.
 * The selector takes the root state object and retrieves the relevant data from the 'Excel_Csv' slice of the state.
 */

import { createSelector } from "reselect";

const ExcelState = (state) => state.Excel_Csv;

export const ExcelSelector = {
  ExcelData: createSelector([ExcelState], (excel) => excel),
};
