import { createSelector } from 'reselect';

const ExcelState = (state) =>state.Excel_Csv

export const ExcelSelector = {
    ExcelData : createSelector([ExcelState],(excel)=>excel),
}