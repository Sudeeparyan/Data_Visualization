import React from "react";
import styles from "./Excel.module.css";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import UploadButton from "../../Reusables/UploadButton/upploadButton";
import {
  useSendExcelCSVMutation,
  useLazyGetExcelQuery,
} from "../../../Redux/ExcelPage/excelRtkQuery";
import { message } from "antd";
import { ExcelSelector } from "../../../Redux/ExcelPage/excelSelector";
import { useSelector } from "react-redux";

const Excel = () => {
  const Excel = useSelector(ExcelSelector.ExcelData);

  const navigate = useNavigate();
  const [sendExcelCSV] = useSendExcelCSVMutation() || {};
  const [getExcel, resultsExcel] = useLazyGetExcelQuery() || {};

  const handleCustomRequest = async ({ file, onError }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await sendExcelCSV(formData);
      if (res.data.fileStatus === "success") await getExcel(res.data.projectId);
    } catch (error) {
      onError(message.error("Error"));
    }
  };

  if (sendExcelCSV.isError) message.error("Error Uploading File!");

  if (resultsExcel.data) {
    navigate(`/Excel/${Excel.ProjectId}`);
  }
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
          {sendExcelCSV.isLoading && <h4>Loading Please Wait...</h4>}
          {sendExcelCSV.isError && <h4>Error</h4>}
        </div>
      </div>
    </div>
  );
};

export default Excel;
