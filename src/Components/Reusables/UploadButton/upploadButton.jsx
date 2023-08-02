import React from 'react'
import styles from './uploadButton.module.css'

import { Button, Upload } from 'antd';
const UploadButton = (props) => {
  return (
    <div>
      <Upload accept={props.accept} customRequest={props.handleCustomRequest}>
      <Button className={styles.uploadButton} icon={props.icon?props.icon:null}>{props.buttonData}</Button>
      </Upload>
    </div>
  )
}

export default UploadButton
