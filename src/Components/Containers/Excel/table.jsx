import React from "react";
import { useSelector } from "react-redux";
import { ExcelSelector } from "../../../Redux/ExcelPage/excelSelector";
import Table from "../../Reusables/Table/table";
/**
 * ExcelTable Componentthat displays tabular data fetched from the Redux store. It uses the `Table` component to render the data in a table format.
 * @returns {JSX.Element} The rendered ExcelTable element.
 */

const ExcelTable = () => {
  //useSelector to get a specific Excel page data
  const Excel = useSelector(ExcelSelector.ExcelData);
  return (
    <div>
      <Table columns={Excel.ExcelColumns} tableData={Excel.ExcelCsv} />
    </div>
  );
};

export default ExcelTable;
