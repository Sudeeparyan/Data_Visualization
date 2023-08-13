/**
 * Excel Component
 *
 * The Excel component is a React functional component that represents the Excel page for uploading and processing CSV files.
 * @returns {JSX.Element} The rendered Excel element.
 */

// React Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Styles
import styles from "./Dashboard.module.css";
// Imports from antD and antV
import { FileAddTwoTone } from "@ant-design/icons";
import { Badge, Card, Tooltip } from "antd";

//ReUsables
import UploadButton from "../../Reusables/UploadButton/upploadButton";
//Redux
import { rootSelector } from "../../../Redux/Root/rootSelector";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { rootActions } from "../../../Redux/Root/rootActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = useSelector(rootSelector.Project.projectData.projectId);
  const pgno = useSelector(rootSelector.Project.projectData.pageNo);

  //Making the upload button diable and enable
  const [disable, setDisable] = useState(false);

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
      setDisable((prev) => !prev);
      const formData = new FormData();
      formData.append("file", file);
      //sending POST Request
      const res = await sendExcelCSV(formData);

      //sending GET Request based on condition
      if (res.data.error === null)
        await getExcel({ projectId: res.data.projectId, pageNo: pgno });
      else {
        setDisable((prev) => !prev);
        onError();
      }
    } catch (error) {
      setDisable((prev) => !prev);
      onError();
    }
  };

  useEffect(() => {
    dispatch(
      rootActions.excelActions.storeExcelCsv({
        tableContent: [],
        columns: [],
        delete: true,
      }),
      dispatch(rootActions.excelActions.storePgno(1))
    );
  }, []);

  //Redirecting the user to another Route when GET Req is Success
  if (resultsExcel.data) {
    navigate(`/Project/${projectId}`);
  }

  return (
    <div>
      <div className={styles.heading}></div>
      <div className={styles.content}>
        <Badge.Ribbon text="Device Vision" color="pink">
          <Card
            title="Click / Drag and drop the Actual Dataset for Testing"
            style={{ width: "500px", fontSize: "17px" }}
          >
            <div style={{ width: "150px", height: "150px" }}>
              <Tooltip
                title="Drag and Drop here"
                placement="rightTop"
                color="cyan"
                key="cyan"
              >
                <div style={{ height: "150px" }}>
                  <UploadButton
                    handleCustomRequest={handleCustomRequest}
                    buttonData={"New Project"}
                    accept={".csv"}
                    work={disable}
                    acceptCount={1}
                    icon={
                      <FileAddTwoTone
                        style={{
                          fontSize: "30px",
                        }}
                      />
                    }
                  />

                  <br></br>
                </div>
              </Tooltip>
            </div>
            {resultCsv.isLoading && (
              <h4 className={styles.upload}>Uploading Please Wait...</h4>
            )}
            {resultsExcel.status === "pending" && (
              <h4 className={styles.upload}>
                File uploaded! Fetching project...
              </h4>
            )}
          </Card>
        </Badge.Ribbon>
      </div>
    </div>
  );
};

export default Dashboard;
