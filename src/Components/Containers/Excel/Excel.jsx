import React,{useState} from 'react'
import styles from './Excel.module.css'
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import UploadButton from '../../Reusables/UploadButton/upploadButton';
import {useSendExcelCSVMutation} from '../../../Redux/Root/ExcelPage/excelRtkQuery'
import { message } from 'antd';
import { ExcelSelector } from '../../../Redux/Selectors/selectors';

const Excel = () => {
      const [sendExcelCSV,sendCsv] = useSendExcelCSVMutation() || {} 
      const Excel = useSelector(ExcelSelector.ExcelData)

  const handleCustomRequest = ({file,onError,onSuccess})=>{
    try {
    const formData = new FormData()
    formData.append('file',file)
        const response =  sendExcelCSV(formData);
        console.log(response);
        onSuccess()  
    } catch (error) {
      console.error(error);
      onError(message.error("Error"));
    }
  }
  
  return ( 
    <div>
      <div className={styles.heading}>Upload the Actual Dataset for Testing</div>
      <div className={styles.content}>
   <div>
    <UploadButton handleCustomRequest={handleCustomRequest} buttonData={"Click to Upload"} accept={".csv"} icon={<UploadOutlined/>}/>
      { sendCsv.isLoading && <h5>Uploading..</h5>  }
      {sendCsv.isError && message.error("Error uploading the file")}
      {sendCsv.isSuccess && message.success("File Uploaded!")}
   </div>
    </div>
    </div>
  )
}

export default Excel
