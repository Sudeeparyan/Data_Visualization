import React from "react";
import styles from "./uploadButton.module.css";
/**
 * A reusable UploadButton component to handle file uploads.
 * @param {function} UploadButton - Callback function triggered on file upload.
 * @returns {JSX.Element} - The rendered UploadButton element.
 */
import { Button, Upload } from "antd";
const UploadButton = (props) => {
  return (
    <div>
      <Upload accept={props.accept} customRequest={props.handleCustomRequest}>
        <Button
          className={styles.uploadButton}
          icon={props.icon ? props.icon : null}
        >
          {props.buttonData}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadButton;
