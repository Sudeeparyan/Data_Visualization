import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Dropdown from "../../Reusables/Dropdown/dropdown";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { rootActions } from "../../../Redux/Root/rootActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowsAltOutlined } from "@ant-design/icons";

const PopupComponent = ({ openmodel, setOpenmodel, selectedModel }) => {
  const models = useSelector(projectSelector.models);
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

  // const [extend, setExtend] = useState(false);

  // const extendPopup = () => {
  //   setExtend(!extend);
  // };

  return (
    <Modal
      title={`Choose the Respective Alias `}
      centered
      open={openmodel}
      onOk={() => setOpenmodel(false)}
      onCancel={() => setOpenmodel(false)}
      closable={false}
      bodyStyle={{
        height: 150,
      }}
      footer={[
        <Button type="primary" onClick={handleSubmitDropDown}>
          Generate Result
        </Button>,
        <Button danger onClick={() => setOpenmodel(false)}>
          Cancel
        </Button>,
      ]}
    >
      <div style={{ display: "flex", fontSize: "15px" }}>
        Selected Model :&nbsp;<p>{selectedModel}</p>
      </div>
      {/* <div>
        <ArrowsAltOutlined onClick={extendPopup} />
      </div> */}
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {xalias} :{" "}
          <Dropdown
            defaultValue={"Select a Column for X"}
            width={"170px"}
            options={columDropdown}
            handleChange={storeXColumn}
          />
        </div>
        <div
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
