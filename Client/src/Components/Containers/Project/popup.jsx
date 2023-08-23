import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Dropdown from "../../Reusables/Dropdown/dropdown";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { rootActions } from "../../../Redux/Root/rootActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PopupComponent = ({ openmodel, setOpenmodel, selectedModel }) => {
  const models = useSelector(projectSelector.models);
  console.log(models);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedModelObject = models.find((obj) => obj[selectedModel]);
  const [xalias, setXAlias] = useState("");
  const [yalias, setYAlias] = useState("");
  const trainX = useSelector(projectSelector.selectedModelX);
  const trainY = useSelector(projectSelector.selectedModelY);
  const projectId = useSelector(projectSelector.projectId);
  const columns = useSelector(projectSelector.tableColumns);
  const columDropdown = [];

  columns.forEach((column) => {
    columDropdown.push({
      value: column,
      label: column,
    });
  });

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

  const handleSubmitDropDown = async () => {
    // Generate a graph based on the selected project
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
          message: "Column name must be Unique",
        })
      );
  };

  return (
    <Modal
      title={`Choose the Respective Alias for ${selectedModel}`}
      centered
      open={openmodel}
      onOk={() => setOpenmodel(false)}
      onCancel={() => setOpenmodel(false)}
      footer={[
        <Button type="primary" onClick={handleSubmitDropDown}>
          Generate Result
        </Button>,
        <Button danger onClick={() => setOpenmodel(false)}>
          Cancel
        </Button>,
      ]}
    >
      <br></br>
      <div>
        {xalias} :{" "}
        <Dropdown
          defaultValue={"Select a Column for X"}
          width={"170px"}
          options={columDropdown}
          handleChange={storeXColumn}
        />
        <br></br>
        <br></br>
        {yalias} :{" "}
        <Dropdown
          defaultValue={"Select a Column for Y"}
          width={"170px"}
          options={columDropdown}
          handleChange={storeYColumn}
        />
      </div>
    </Modal>
  );
};

export default PopupComponent;
