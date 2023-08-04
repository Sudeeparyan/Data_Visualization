import React from "react";
import styles from "./Dashboard.module.css";
import ButtonComponent from "../../Reusables/Button/Button";

const Dashboard = () => {
  return (
    <div className={styles.content}>
      <h3>Dashboard Page under Development!!</h3>
      <br></br>
      <ButtonComponent content={"Go to Excel Page"} action={"Excel"} />
    </div>
  );
};

export default Dashboard;
