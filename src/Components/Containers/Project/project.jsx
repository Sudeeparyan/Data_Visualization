import React, { useEffect } from "react";
import ExcelTable from "../Excel/table";
import { useLocation } from "react-router-dom";
import { useLazyGetExcelQuery } from "../../../Redux/ExcelPage/excelRtkQuery";
import { message } from "antd";

/**
 * Project Component
 *
 * The Project component is a React functional component that represents a project page
 * with an Excel table.
 * @returns {JSX.Element} The rendered Project element.
 */

const Project = () => {
  const location = useLocation();
  const [getExcel, resultsExcel] = useLazyGetExcelQuery() || {};
  /**
   * useEffect Hook
   * This hook is used to fetch Excel data based on the current path when the component mounts.
   */
  useEffect(() => {
    const path = location.pathname.split("/")[2];
    getExcel(path);
  }, []);

  if (resultsExcel.data) {
    try {
      if (resultsExcel.data.error !== null)
        message.error(resultsExcel.data.error);
      else message.success("Fetch Success");
    } catch (e) {
      console.log(e);
    }
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
