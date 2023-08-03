import React, { useEffect } from "react";
import ExcelTable from "../Excel/table";
import { useLocation } from "react-router-dom";
import { useLazyGetExcelQuery } from "../../../Redux/ExcelPage/excelRtkQuery";
import { message } from "antd";
const Project = () => {
  const location = useLocation();
  const [getExcel, resultsExcel] = useLazyGetExcelQuery() || {};

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    getExcel(path);
  }, []);

  if (resultsExcel.data) {
    if (resultsExcel.data.error !== null)
      message.error(resultsExcel.data.error);
    else message.success("Fetch Success");
  }

  return (
    <div>
      <div>
        <ExcelTable />
      </div>
    </div>
  );
};

export default Project;
