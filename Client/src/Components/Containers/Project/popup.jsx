//React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//AntD Imports
import { Modal, Button } from "antd";
//Imports from Resusables
import Dropdown from "../../Reusables/Dropdown/dropdown";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { rootActions } from "../../../Redux/Root/rootActions";
import { useSelector, useDispatch } from "react-redux";

/**
 * PopupComponent displays a modal for selecting X and Y axis columns.
 *
 * @component
 * @param {boolean} openmodel - Indicates if the popup modal is open.
 * @param {function} setOpenmodel - Function to toggle the popup modal open/close.
 * @param {string} selectedModel - The selected model.
 */

const PopupComponent = ({ openmodel, setOpenmodel, selectedModel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [xalias, setXAlias] = useState("");
  const [yalias, setYAlias] = useState("");

  const models = useSelector(projectSelector.models);
  const trainX = useSelector(projectSelector.selectedModelX);
  const trainY = useSelector(projectSelector.selectedModelY);
  const projectId = useSelector(projectSelector.projectId);
  const columns = useSelector(projectSelector.tableColumns);

  const selectedModelObject = models.find((obj) => obj[selectedModel]);

  useEffect(() => {
    if (selectedModelObject) {
      const { x_coordinate, y_coordinate } = selectedModelObject[selectedModel];
      setXAlias(x_coordinate);
      setYAlias(y_coordinate);
    }
  }, [selectedModel, selectedModelObject]);

  const storeXColumn = (x) => {
    dispatch(rootActions.excelActions.storeTrainX({ x: x.value }));
  };
  const storeYColumn = (y) => {
    dispatch(rootActions.excelActions.storeTrainY({ y: y.value }));
  };

  const handleSubmitDropDown = () => {
    dispatch(rootActions.excelActions.storeResultId(0));
    if (trainX === "" || trainY === "")
      dispatch(
        rootActions.notificationActions.storeNotification({
          type: "info",
          message: "Please fill all the Fields Properly",
        })
      );
    else if (trainX !== trainY)
      navigate(`/Project/projectId/${projectId}/results`);
    else
      dispatch(
        rootActions.notificationActions.storeNotification({
          type: "info",
          message: "Column names must be Unique",
        })
      );
  };

  //Refactoring the data from the store to render inside the dropdown
  const columDropdown = [];
  columns.forEach((column) => {
    columDropdown.push({
      value: column,
      label: column,
    });
  });

  return (
    <Modal
      title={`Choose the Respective Alias `}
      centered
      open={openmodel}
      onCancel={() => setOpenmodel(false)}
      closable={false}
      bodyStyle={{
        height: 150,
      }}
      footer={[
        <Button danger onClick={() => setOpenmodel(false)}>
          Cancel
        </Button>,
        <Button type="primary" onClick={handleSubmitDropDown}>
          Generate Result
        </Button>,
      ]}
    >
      <div className={styles.popupSeleted}>
        Selected Model :&nbsp;<p>{selectedModel}</p>
      </div>
      <br></br>
      <div className={styles.dropdownParent}>
        <div className={styles.dropDown}>
          {xalias} :{" "}
          <Dropdown
            defaultValue={"Select a Column for X"}
            width={"170px"}
            options={columDropdown}
            handleChange={storeXColumn}
          />
        </div>
        <div className={styles.dropDown}>
          {" "}
          {yalias} :{" "}
          <Dropdown
            defaultValue={"Select a Column for Y"}
            width={"170px"}
            options={columDropdown}
            handleChange={storeYColumn}
          />
        </div>
      </div>
      <br></br>
    </Modal>
  );
};

export default PopupComponent;
