/**
 * Excel Slice
 *
 * This file creates a Redux slice named "excel" to manage Excel-related data in the Redux store.
 * The slice includes the initial state, actions, and a reducer function to update the state based on dispatched actions.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ExcelCsv: [],
  ExcelColumns: [],
  ProjectId: 0,
  pgNo: 1,
  Graph: [],
};

const ExcelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    storeExcelCsv: (state, action) => {
      if (action.payload.delete) state.ExcelCsv = [];
      state.ExcelCsv = [...state.ExcelCsv, ...action.payload.tableContent];
      state.ExcelColumns = action.payload.columns;
    },
    storePgno: (state, action) => {
      state.pgNo = action.payload;
    },
    storeExcelid: (state, action) => {
      state.ProjectId = action.payload.projectId;
    },
    storeGraph: (state, action) => {
      state.Graph = action.payload.graphData;
    },
  },
});

export const { storeExcelCsv, storeExcelid, storePgno, storeGraph } =
  ExcelSlice.actions;
export default ExcelSlice.reducer;
