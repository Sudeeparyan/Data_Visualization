import React, { useState } from "react";
import styles from "./Excel.module.css";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import UploadButton from "../../Reusables/UploadButton/upploadButton";
import {
  useSendExcelCSVMutation,
  useGetExcelQuery,
} from "../../../Redux/Root/ExcelPage/excelRtkQuery";
import { message } from "antd";
import ExcelTable from "./table";
import { ExcelSelector } from "../../../Redux/Selectors/selectors";
import { useSelector } from "react-redux";

const Excel = () => {
  const Excel = useSelector(ExcelSelector.ExcelData);
  console.log(Excel);
  const navigate = useNavigate();
  const [sendExcelCSV, sendCsv] = useSendExcelCSVMutation() || {};
  const { data, error, isLoading, isSuccess, refetch } =
    useGetExcelQuery(Excel.ProjectId) || {};

  const handleCustomRequest = ({ file, onError, onSuccess }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = sendExcelCSV(formData, {
        onSuccess: () => {
          refetch();
        },
      });
      onSuccess(message.success("File Uploaded!"));
    } catch (error) {
      onError(message.error("Error"));
    }
  };

  if (error) console.log(error);
  if (data) navigate(`/Excel/${Excel.ProjectId}`);

  return (
    <div>
      <div className={styles.heading}>
        Upload the Actual Dataset for Testing
      </div>
      <div className={styles.content}>
        <div>
          <UploadButton
            handleCustomRequest={handleCustomRequest}
            buttonData={"Click to Upload"}
            accept={".csv"}
            icon={<UploadOutlined />}
          />
          <br></br>
          {sendCsv.isLoading && <h4>Uploading Please Wait...</h4>}
          {sendCsv.isError && message.error("Error uploading the file")}
        </div>
      </div>
    </div>
  );
};

export default Excel;
