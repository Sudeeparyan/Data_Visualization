import React, { useState } from "react";
import { Drawer, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Reusables/Button/Button";
import Dropdown from "../../Reusables/Dropdown/dropdown";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { useSelector, useDispatch } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { rootActions } from "../../../Redux/Root/rootActions";
import styles from "./project.module.css";
import PopupComponent from "./popup";

const Sidebar = ({ open, setOpen }) => {
  const [openchild, setOpenchild] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectId = useSelector(projectSelector.projectId);
  const Results = useSelector(projectSelector.Results);
  const columns = useSelector(projectSelector.tableColumns);
  const models = useSelector(projectSelector.models);
  const trainX = useSelector(projectSelector.selectedModelX);
  const trainY = useSelector(projectSelector.selectedModelY);

  const [errormsg, setErrormsg] = useState(false);
  const [errormodel, setErrormodel] = useState(false);
  const [modelselected, setModelselected] = useState("");

  const selectedModel = useSelector(projectSelector.selectedModel);

  const [getResults, getResulstResponse] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};

  //+++++++++++++++++++++++

  const [model, setModel] = useState(true);
  const [result, setResult] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);

  // const showModels = async () => {
  //   const res = await getModels();
  //   if (res.data.message) setErrormodel(true);
  //   else setErrormodel(false);
  // };

  const storeSelectedModel = (model, selected) => {
    dispatch(rootActions.excelActions.storeTrainData({ model: model }));
    setOpenmodel(true);
    setModelselected(selected);
  };

  const columDropdown = [];

  columns.forEach((column) => {
    columDropdown.push({
      value: column,
      label: column,
    });
  });

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

  const getAvailableResults = async () => {
    const res = await getResults({ projectId: projectId });
    if (res.data.message) setErrormsg(true);
    else setErrormsg(false);
  };

  const getResultGraph = (resultId) => {
    dispatch(rootActions.excelActions.storeResultId(resultId));
    navigate(`/Project/projectId/${projectId}/results`);
  };

  return (
    <div>
      <div>
        <PopupComponent
          openmodel={openmodel}
          setOpenmodel={setOpenmodel}
          selectedModel={modelselected}
        />
      </div>
      <Drawer
        width={380}
        closable={true}
        onClose={() => setOpen(!open)}
        open={open}
        style={{
          borderLeft: "5px solid #3AB0FF",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40px",
            justifyContent: "space-evenly",
            fontSize: "17px",
            color: "#FFFFFF",
            borderBottom: "2px solid grey",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "rgba(0, 174, 255, 0.753)",
            }}
            onClick={() => {
              setModel(true);
              setResult(false);
            }}
          >
            Models
          </div>
          <div
            style={{
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "rgba(0, 174, 255, 0.753)",
            }}
            onClick={() => {
              setModel(false);
              setResult(true);
            }}
          >
            Results
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          {model && !result ? (
            <div style={{ height: "100%", marginTop: "20px", width: "100%" }}>
              <h3>Available Models</h3>

              <div className={styles.modelPop}>
                {models.map((object, index) => {
                  const key = Object.keys(object)[0];
                  const modelId = object[key].modelId; // Assuming each object has only one key-value pair
                  return (
                    <>
                      <div
                        className={styles.scrollBox}
                        key={index}
                        onClick={() => storeSelectedModel(modelId, key)}
                      >
                        {key}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ height: "100%", marginTop: "20px", width: "100%" }}>
              <h3>Available Results</h3>

              <div className={styles.modelPop}>
                {Results.map((result) => {
                  return (
                    <>
                      <div
                        className={styles.scrollBox}
                        onClick={() => getResultGraph(result)}
                      >
                        Result-{result}
                      </div>
                      <hr></hr>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Drawer
          title={"Select the Respective Columns"}
          width={320}
          closable={true}
          onClose={() => setOpenchild(!openchild)}
          open={openchild}
          style={{
            borderLeft: "5px solid #3AB0FF",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              X:&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                defaultValue={"Select a Column for X"}
                width={"170px"}
                options={columDropdown}
                handleChange={storeXColumn}
              />
              <br></br>
              <br></br>
              Y:&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                defaultValue={"Select a Column for Y"}
                width={"170px"}
                options={columDropdown}
                handleChange={storeYColumn}
              />
            </div>
            <br></br>
            <div style={{ marginLeft: "20px" }}>
              <ButtonComponent
                content={"Test data"}
                loading={false}
                onclick={handleSubmitDropDown}
              />
            </div>
          </div>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default Sidebar;
