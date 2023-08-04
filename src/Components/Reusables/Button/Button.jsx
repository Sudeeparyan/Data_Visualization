import React from "react";
import styles from "./Button.module.css";
/**
 * A reusable button component.
 * @param {string} text - The text to display inside the button.
 * @param {function} ButtonComponent - The click event handler for the button.
 * @returns {JSX.Element} - The rendered button element.
 */

const ButtonComponent = () => {
  return (
    <div>
      <button className={styles.viewButton}>Preview</button>
    </div>
  );
};

export default ButtonComponent;
