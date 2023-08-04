import React from "react";
import styles from "./Navbar.module.css";
/**
 * A reusable Navbar component.
 * @returns {JSX.Element} - The rendered Navbar element.
 */
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div>
        <h3>Device Vision</h3>
      </div>
    </div>
  );
};

export default Navbar;
