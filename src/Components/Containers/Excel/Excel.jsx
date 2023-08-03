import React from "react";
import styles from "./Excel.module.css";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import UploadButton from "../../Reusables/UploadButton/upploadButton";
import { rootSelector } from "../../../Redux/Root/RootSelector/rootSelector";
import { rootQuery } from "../../../Redux/Root/RootQuery/rootQuery";
import { message } from "antd";
import { useSelector } from "react-redux";

const Excel = () => {
  //useSelector to get a specific Excel page data
  const Excel = useSelector(rootSelector.ExcelSelector.ExcelData);
  const navigate = useNavigate();

  //POST Req RTK Query to send the uploaded csv
  const [sendExcelCSV] = rootQuery.excelPage.useSendExcelCSVMutation() || {};
  //GET Req to get the project from Backend
  const [getExcel, resultsExcel] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};

  //This Function is Trgiggered when a csv is selected by the user
  const handleCustomRequest = async ({ file, onError }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      //sending POST Request
      const res = await sendExcelCSV(formData);
      //sending GET Request based on condition
      if (res.data.fileStatus === "success") await getExcel(res.data.projectId);
    } catch (error) {
      onError(message.error("Error Uploading File"));
    }
  };

  //Error Handling
  if (sendExcelCSV.isError) message.error("Error Uploading File!");

  if (resultsExcel.data) console.log(resultsExcel.data);
  //Redirecting the user to another Route when GET Req is Success
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
