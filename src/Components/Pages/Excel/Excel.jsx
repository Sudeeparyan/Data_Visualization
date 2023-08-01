import React from 'react'
import styles from './Excel.module.css'
import ButtonComponent from '../../Reusables/Button/Button';
import UploadButton from '../../Reusables/UploadButton/upploadButton';

const Excel = () => {
  return (
    <div>
      <div className={styles.heading}>Upload the Actual Dataset for Testing</div>
      <div className={styles.content}>
   <div>
    <UploadButton/>
   </div>
   <div>
    <ButtonComponent/>
   </div>
    </div>
    </div>
  )
}

export default Excel
