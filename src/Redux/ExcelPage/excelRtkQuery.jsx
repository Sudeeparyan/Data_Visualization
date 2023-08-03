import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Networks/baseUrl";
import { endpointsApi } from "../../Networks/endPoints";
import { rootActions } from "../Root/RootActions/rootActions";

export const sendExcelCsv = createApi({
  reducerPath: "SendCsvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    sendExcelCSV: builder.mutation({
      query: (formData) => ({
        url: endpointsApi.send_csv_file_Excel,
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("id", data);
          dispatch(rootActions.excelActions.storeExcelid(data));
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
    getExcel: builder.query({
      query: (id) => endpointsApi.get_Excel_csv + `${id}`,
      async onQueryStarted(res, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(rootActions.excelActions.storeExcelCsv(data));
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
  }),
});

export const { useSendExcelCSVMutation, useLazyGetExcelQuery } = sendExcelCsv;
