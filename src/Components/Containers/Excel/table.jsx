import React from 'react'
import { useSelector } from 'react-redux';
import { ExcelSelector } from '../../../Redux/Selectors/selectors';
import Table from '../../Reusables/Table/table';
const ExcelTable = () => {
     const Excel = useSelector(ExcelSelector.ExcelData)
  return (
    <div>
      <Table columns={Excel.ExcelColumns} tableData={Excel.ExcelCsv} />
    </div>
  )
}

export default ExcelTable
