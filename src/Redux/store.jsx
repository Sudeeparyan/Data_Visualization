import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {sendExcelCsv} from './Root/ExcelPage/excelRtkQuery'
import  {Excelreducer}  from './Root/ExcelPage/excelReducer'


 export const store = configureStore({
    reducer : Excelreducer,
    middleware: getDefaultMiddleware().concat(sendExcelCsv.middleware), 
})

