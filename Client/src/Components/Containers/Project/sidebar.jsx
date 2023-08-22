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
  const columns = useSelector(projectSelector.tableColumns);
  const models = useSelector(projectSelector.models);

  const selectedModel = useSelector(projectSelector.selectedModel);
  const [getModels, modelsResponse] =
    rootQuery.excelPage.useLazyGetModelsQuery() || {};

  const showModels = () => {
    getModels();
  };

  const storeSelectedModel = (model) => {
    dispatch(rootActions.excelActions.storeTrainData({ model: model }));
    setOpenchild(true);
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
    navigate(`/Project/projectId=/${projectId}/modelId=/${selectedModel}`);
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

          <div style={{ height: "85%", marginTop: "32px" }}>
            {modelsResponse.isSuccess && (
              <div className={styles.modelPop}>
                {models.map((model) => {
                  return (
                    <>
                      <div
                        style={{
                          fontSize: "17px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => storeSelectedModel(model)}
                      >
                        Model-{model}
                      </div>
                      <hr></hr>
                    </>
                  );
                })}
              </div>
            )}
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
            <ButtonComponent content={"Show Results"} loading={false} />
          </div>
          <div style={{ height: "70%", width: "120px" }}></div>
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
              <b>Model-{selectedModel}</b>
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
            <div>
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
