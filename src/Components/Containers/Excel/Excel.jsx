import React from "react";
import styles from "./Excel.module.css";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import UploadButton from "../../Reusables/UploadButton/upploadButton";
import { rootSelector } from "../../../Redux/Root/RootSelector/rootSelector";
import { rootQuery } from "../../../Redux/Root/RootQuery/rootQuery";
import { message, Button } from "antd";
import { useSelector } from "react-redux";
import ButtonComponent from "../../Reusables/Button/Button";

/**
 * Excel Component
 *
 * The Excel component is a React functional component that represents the Excel page for uploading and processing CSV files.
 * @returns {JSX.Element} The rendered Excel element.
 */

const Excel = () => {
  //useSelector to get a specific Excel page data
  const Excel = useSelector(rootSelector.ExcelSelector.ExcelData);
  const navigate = useNavigate();

  //POST Req RTK Query to send the uploaded csv
  const [sendExcelCSV, resultCsv] =
    rootQuery.excelPage.useSendExcelCSVMutation() || {};
  //GET Req to get the project from Backend
  const [getExcel, resultsExcel] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};

  /**
   * handleCustomRequest
   *
   * This function is triggered when a CSV file is selected by the user for upload.
   * It sends a POST request to upload the CSV file and a subsequent GET request
   * based on the condition to fetch the project data from the backend.
   *
   * @param {Object} options - Options object containing the uploaded file and error handling.
   */
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
          {resultCsv.isLoading && <h4>Uploading Please Wait...</h4>}
        </div>
      </div>
    </div>
  );
};

export default Excel;
