import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {sendExcelCsv} from './Services/sendExcelCsv'

export const store = configureStore({
    reducer : {
     [sendExcelCsv.reducerPath] : sendExcelCsv.reducer,   
    },
    middleware: getDefaultMiddleware().concat(sendExcelCsv.middleware), 
})