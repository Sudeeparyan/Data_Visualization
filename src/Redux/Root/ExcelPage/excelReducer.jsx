import Excelreducers from '../ExcelPage/excelSlice'
import {sendExcelCsv} from '../ExcelPage/excelRtkQuery'

export const Excelreducer = {
    [sendExcelCsv.reducerPath] : sendExcelCsv.reducer,
    Excel_Csv : Excelreducers,
}