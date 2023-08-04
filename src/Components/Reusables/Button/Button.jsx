import React from "react";
import styles from "./Button.module.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
/**
 * A reusable button component.
 * @param {string} text - The text to display inside the button.
 * @param {function} ButtonComponent - The click event handler for the button.
 * @returns {JSX.Element} - The rendered button element.
 */

const ButtonComponent = (props) => {
  const navigate = useNavigate();
  const buttonAction = () => {
    navigate(`/${props.action}`);
  };
  return (
    <div>
      <Button className={styles.viewButton} onClick={buttonAction}>
        {props.content}
      </Button>
    </div>
  );
};

export default ButtonComponent;
