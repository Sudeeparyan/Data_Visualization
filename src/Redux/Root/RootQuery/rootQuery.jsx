import {
  useLazyGetExcelQuery,
  useSendExcelCSVMutation,
} from "../../ExcelPage/excelRtkQuery";

export const rootQuery = {
  excelPage: {
    useLazyGetExcelQuery,
    useSendExcelCSVMutation,
  },
};
