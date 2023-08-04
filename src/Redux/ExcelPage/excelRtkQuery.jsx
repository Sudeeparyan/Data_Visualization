/**
 * sendExcelCsv API Slice
 *
 * This code defines an API slice for sending and receiving Excel CSV data using Redux Toolkit's createApi.
 * It exports the API slice and custom hooks to be used in React components for making API requests.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../Networks/baseUrl";
import { endpointsApi } from "../../Networks/endPoints";
import { rootActions } from "../Root/RootActions/rootActions";

export const sendExcelCsv = createApi({
  reducerPath: "SendCsvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // Define the API endpoints for sending and receiving Excel CSV data
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
    // Query for receiving Excel CSV data from the server based on an 'id'
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
