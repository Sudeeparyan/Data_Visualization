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

const Sidebar = ({ open, setOpen, heading }) => {
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
  const [getModels, modelsResponse] =
    rootQuery.excelPage.useLazyGetModelsQuery() || {};

  const [getResults, getResulstResponse] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};

  const showModels = async () => {
    const res = await getModels();
    if (res.data.message) setErrormodel(true);
    else setErrormodel(false);
  };

  const storeSelectedModel = (model, selected) => {
    dispatch(rootActions.excelActions.storeTrainData({ model: model }));
    setOpenchild(true);
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
      <Drawer
        title={heading}
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "280px",
          }}
        >
          <div style={{ height: "15%" }}>
            <ButtonComponent
              content={"Show Models"}
              loading={modelsResponse.isFetching}
              onclick={showModels}
            />
          </div>

          <div style={{ height: "85%" }}>
            {modelsResponse.isSuccess === true && errormodel === false ? (
              <div className={styles.modelPop}>
                {!errormodel &&
                  models.map((model) => {
                    return (
                      <>
                        <div
                          className={styles.scrollBox}
                          onClick={() =>
                            storeSelectedModel(model.split("-")[0], model)
                          }
                        >
                          {model}
                        </div>
                        <hr></hr>
                      </>
                    );
                  })}
              </div>
            ) : errormodel === true ? (
              <div
                style={{ textAlign: "center", fontSize: "17px", color: "red" }}
              >
                No Results Found !
              </div>
            ) : null}
          </div>
        </div>
        <Divider>
          <b>View Results</b>
        </Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            marginTop: "-20px",
          }}
        >
          <div style={{ height: "15%" }}>
            <ButtonComponent
              content={"Show Results"}
              loading={getResulstResponse.isLoading}
              onclick={getAvailableResults}
            />
          </div>
          <div style={{ height: "70%", width: "140px" }}>
            {getResulstResponse.isSuccess === true && errormsg === false ? (
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
            ) : errormsg === true ? (
              <div
                style={{ textAlign: "center", fontSize: "17px", color: "red" }}
              >
                No Results Found !
              </div>
            ) : null}
          </div>
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
              fontSize: "17px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Selected Model: &nbsp;&nbsp;
            <div style={{ color: "#38E54D" }}>
              <b>{modelselected}</b>
            </div>
          </div>
          <br></br>
          <br></br>
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
