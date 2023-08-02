import React from 'react'
import styles from './Excel.module.css'
import { UploadOutlined } from '@ant-design/icons';
import UploadButton from '../../Reusables/UploadButton/upploadButton';
import {useSendExcelCSVMutation} from '../../../Redux/Root/ExcelPage/excelRtkQuery'
import { message } from 'antd';
import ExcelTable from './table';

const Excel = () => {
      const [sendExcelCSV,sendCsv] = useSendExcelCSVMutation() || {} 

     

      const handleCustomRequest = ({file,onError,onSuccess})=>{
        try {
        const formData = new FormData()
        formData.append('file',file)
            const response =  sendExcelCSV(formData);
            onSuccess(message.success("File Uploaded!"))  
        } catch (error) {
          onError(message.error("Error"));
        }
      }
  
  return ( 
    <div>
          <div className={styles.heading}>Upload the Actual Dataset for Testing</div>
            <div className={styles.content}>
              <div>
                <UploadButton handleCustomRequest={handleCustomRequest} buttonData={"Click to Upload"} accept={".csv"} icon={<UploadOutlined/>}/>
                  {sendCsv.isLoading && <h4>Uploading Please Wait...</h4>  }
                  {sendCsv.isError && message.error("Error uploading the file")}
              </div>
          </div>
          {
            sendCsv.data && 
            <div className={styles.flexParent}>
              <div>
                <ExcelTable/>
                </div>
                <div className={styles.sideBar}>

                </div>
            </div>
            }
    </div>
  )
}

export default Excel
