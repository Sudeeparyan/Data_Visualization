import React, { useEffect, useState } from "react";
import { Drawer, Input, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../Reusables/Button/Button";
import Dropdown from "../../Reusables/Dropdown/dropdown";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { useSelector, useDispatch } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { rootActions } from "../../../Redux/Root/rootActions";
import styles from "./project.module.css";
import PopupComponent from "./popup";
import Loader from "../../Reusables/Spinner/loader";
import { SearchOutlined } from "@ant-design/icons";

const Sidebar = ({ open, setOpen, modelsResponse }) => {
  const [openchild, setOpenchild] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectId = useSelector(projectSelector.projectId);
  const Results = useSelector(projectSelector.Results);
  const columns = useSelector(projectSelector.tableColumns);
  const models = useSelector(projectSelector.models);
  const trainX = useSelector(projectSelector.selectedModelX);
  const trainY = useSelector(projectSelector.selectedModelY);
  const [errormodel, setErrormodel] = useState(false);
  // console.log(models);
  let transformedData =
    !errormodel &&
    models.map((obj) => {
      const key = Object.keys(obj)[0]; // Get the key, e.g., 'analog', 'switch', etc.
      const modelId = obj[key].modelId; // Get the modelId
      return { name: key, id: modelId };
    });

  const [search, setSearch] = useState("");
  const [modeldata, setModelData] = useState(transformedData);

  const onSearch = (value) => setSearch(value.target.value);

  // useEffect(() => {
  //   setModelData(transformedData);
  // }, []);

  useEffect(() => {
    const searchWord = search.trim().toLocaleLowerCase();
    const escapedSearchWord = searchWord.replace(
      /[.*+\-?^${}()|[\]\\]/g,
      "\\$&"
    );
    if (searchWord.length > 0) {
      const a = transformedData.filter(function (data) {
        const regex = new RegExp(escapedSearchWord, "g"); // Create a regular expression
        return data.name.toLowerCase().match(regex);
      });
      setModelData(a);
    } else setModelData(transformedData);
  }, [search, models]);

  const [errormsg, setErrormsg] = useState(false);

  const [modelselected, setModelselected] = useState("");
  // console.log(errormodel);
  // useEffect(() => {
  //   if (modelsResponse.data && modelsResponse.data.message) setErrormodel(true);
  //   else setErrormodel(false);
  // }, [modelsResponse.data]);

  const selectedModel = useSelector(projectSelector.selectedModel);

  const [getResults, getResulstResponse] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};

  //+++++++++++++++++++++++

  const [model, setModel] = useState(true);
  const [result, setResult] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);

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

  const bgColorModel = model ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";
  const bgColorResult = result ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";

  const colorModel = model ? "#FFF" : "black";
  const colorResult = result ? "#FFF" : "black";

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
        title={
          model
            ? "Click on the Model for Testing"
            : "Click on any Results to view it"
        }
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
            color: colorModel,
            borderBottom: "2px solid rgb(229 229 229)",
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
              backgroundColor: bgColorModel,
              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            onClick={() => {
              setModel(true);
              setResult(false);
              setModelData(transformedData);
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
              color: colorResult,
              backgroundColor: bgColorResult,
              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            onClick={() => {
              setModel(false);
              setResult(true);
              getAvailableResults();
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Input
                  placeholder="Search a model.."
                  onChange={(e) => onSearch(e)}
                  suffix={
                    <Tooltip title="Search Models">
                      <SearchOutlined />
                    </Tooltip>
                  }
                  style={{
                    width: 180,
                  }}
                />
              </div>

              {modelsResponse.data && !modelsResponse.data.message ? (
                <div className={styles.modelPop}>
                  {modeldata.length === 0 && (
                    <div>
                      <b>No Matches Found</b>
                    </div>
                  )}
                  {!modelsResponse.isFetching ? (
                    modeldata.map((object, index) => {
                      // Assuming each object has only one key-value pair
                      return (
                        <>
                          <div
                            className={styles.scrollBox}
                            key={index}
                            onClick={() =>
                              storeSelectedModel(object.id, object.name)
                            }
                          >
                            {object.name}
                          </div>
                          <hr></hr>
                        </>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "20%",
                      }}
                    >
                      <Loader />
                    </div>
                  )}
                </div>
              ) : null}
              {/* {errormodel ? <p>No models</p> : null} */}
            </div>
          ) : (
            <div style={{ height: "100%", marginTop: "20px", width: "100%" }}>
              <h3>Available Results</h3>

              {!errormsg ? (
                <div className={styles.modelPop}>
                  {!getResulstResponse.isLoading ? (
                    Results.map((result, index) => {
                      return (
                        <>
                          <div
                            className={styles.scrollBox}
                            onClick={() => getResultGraph(result)}
                          >
                            Result-{index + 1}
                          </div>
                          <hr></hr>
                        </>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "20%",
                      }}
                    >
                      <Loader />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                    margin: "10px",
                  }}
                >
                  No Results Found !
                </div>
              )}
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
