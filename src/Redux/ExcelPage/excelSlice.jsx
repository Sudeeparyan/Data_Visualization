import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ExcelCsv: [],
  ExcelColumns: [],
  ProjectId: 0,
  Error: "",
};

const ExcelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    storeExcelCsv: (state, action) => {
      console.log(action);
      state.ExcelCsv = action.payload.tableContent;
      state.ExcelColumns = action.payload.columns;
      state.Error = action.payload.error;
    },
    storeExcelid: (state, action) => {
      console.log(action);
      state.ProjectId = action.payload.projectId;
      state.Error = action.payload.error;
    },
  },
});

export const { storeExcelCsv, storeExcelid } = ExcelSlice.actions;
export default ExcelSlice.reducer;
