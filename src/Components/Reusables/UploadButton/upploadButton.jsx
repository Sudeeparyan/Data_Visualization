import React from 'react'
import styles from './uploadButton.module.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const UploadButton = () => {
  return (
    <div>
       <Upload>
    <Button className={styles.uploadButton} icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    </div>
  )
}

export default UploadButton
