import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../Networks/baseUrl'
import {send_csv_file_Excel} from "../../Networks/endPoints"

export const sendExcelCsv = createApi({
    reducerPath : "SendCsvApi",
    baseQuery :fetchBaseQuery({
        baseUrl : BASE_URL
    }),
    endpoints : (builder)=>({
        sendExcelCSV : builder.mutation({
            query : (formData)=>({
                url: send_csv_file_Excel,
                method : 'POST',
                body : formData
            }),
              async onQueryStarted(res, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  console.log(data);
                } catch (err) {
                  console.log("error... ", err);
                }
              },
        })
    })
})

export const {useSendExcelCSVMutation} = sendExcelCsv