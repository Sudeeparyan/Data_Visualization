import React from "react";
//Imports from Reusables
import Loader from "../../Reusables/Spinner/loader";
//Import from Styles
import styles from "./project.module.css";
const Loaders = ({ loadingText, style }) => {
  return (
    <div>
      <div className={style}>
        <div>
          <Loader />
        </div>
        <h4>{loadingText}</h4>
      </div>
    </div>
  );
};

export default Loaders;
