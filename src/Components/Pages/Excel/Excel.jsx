import React,{useState} from 'react'
import styles from './Excel.module.css'
import ButtonComponent from '../../Reusables/Button/Button';
import UploadButton from '../../Reusables/UploadButton/upploadButton';
import {useSendExcelCSVMutation} from '../../../Redux/Services/sendExcelCsv'
import { Progress } from 'antd';

const Excel = () => {
      const [sendExcelCSV,sendCsv] = useSendExcelCSVMutation() || {} 
      const [percent,setPercent] = useState(0)
      const [loading,setLoading]= useState(false)

    const incrementState =()=>{
        setPercent(prev=>prev+25)
    }

  const handleCustomRequest = ({file,onError,onSuccess})=>{
     setLoading(true) 
    setPercent(0)
    let intervalId =setInterval(incrementState,1000)
    try {
    const formData = new FormData()
    setLoading(!loading)
    formData.append('file',file)
    setTimeout(()=>{
        const response =  sendExcelCSV(formData);
        onSuccess(setPercent(100))
        clearInterval(intervalId)
        setLoading(false)
    },4500)
      setPercent(0)
    } catch (error) {
      console.error(error);
      onError(error);
    }
  }
  
  return ( 
    <div>
      <div className={styles.heading}>Upload the Actual Dataset for Testing</div>
      <div className={styles.content}>
   <div>
    <UploadButton handleCustomRequest={handleCustomRequest} />
      { loading && <Progress percent={percent}  />}
      {sendCsv.isError && <div>Error</div>}
   </div>
   <div>
    <ButtonComponent/>
   </div>
    </div>
    </div>
  )
}

export default Excel
