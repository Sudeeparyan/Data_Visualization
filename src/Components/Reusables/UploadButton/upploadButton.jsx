import React from 'react'
import styles from './uploadButton.module.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const UploadButton = (props) => {
  console.log(props);
  return (
    <div>
      <Upload customRequest={props.handleCustomRequest}>
      <Button className={styles.uploadButton} icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

export default UploadButton
