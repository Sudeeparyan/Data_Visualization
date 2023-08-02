import {createSlice} from '@reduxjs/toolkit'

 const initialState = {
    ExcelCsv:[],
    ExcelColumns:[]
}

const ExcelSlice = createSlice({
    name:"excel",
    initialState,
    reducers:{
    storeExcelCsv:(state,action)=>{
        console.log(action);
        state.ExcelCsv = action.payload.table_data
        state.ExcelColumns = action.payload.columns
    }
  }
})

export const {storeExcelCsv} = ExcelSlice.actions
export default ExcelSlice.reducer