//React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupComponent from "./popup";
//Imports from AntD
import { Drawer, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
//Imrport from Styles
import styles from "./project.module.css";
//Imports from Reusables
import Loader from "../../Reusables/Spinner/loader";
//Imports from Redux
import { projectSelector } from "../../../Redux/Root/rootSelector";
import { useSelector, useDispatch } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { rootActions } from "../../../Redux/Root/rootActions";

/**
 * Sidebar component displays a drawer with Models and Results tabs.
 *
 * @component
 * @param {boolean} open - Indicates if the sidebar is open.
 * @param {function} setOpen - Function to toggle the sidebar open/close.
 * @param {Object[]} modelsResponse - Response data for models.
 */

const Sidebar = ({ open, setOpen, modelsResponse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  const [model, setModel] = useState(true);
  const [result, setResult] = useState(false);
  const [openmodel, setOpenmodel] = useState(false);
  const [modelselected, setModelselected] = useState("");

  const projectId = useSelector(projectSelector.projectId);
  const Results = useSelector(projectSelector.Results);
  const models = useSelector(projectSelector.models);

  //Refactoring the Data from the store
  const transformedData = models.map((obj) => {
    const key = Object.keys(obj)[0];
    const modelId = obj[key].modelId;
    return { name: key, id: modelId };
  });
  const [modeldata, setModelData] = useState(transformedData);

  //Tabs background color switch logics
  const bgColorModel = model ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";
  const bgColorResult = result ? "rgba(0, 174, 255, 0.753)" : "#F4F7F7";
  const colorModel = model ? "#FFF" : "black";
  const colorResult = result ? "#FFF" : "black";

  const [getResults, getResulstResponse] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};
  useEffect(() => {
    //Search Logics
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

  const onSearch = (value) => setSearch(value.target.value);

  const storeSelectedModel = (model, selected) => {
    dispatch(rootActions.excelActions.storeTrainData({ model: model }));
    setOpenmodel(true);
    setModelselected(selected);
  };

  const getAvailableResults = async () => {
    const res = await getResults({ projectId: projectId });
    if (res.data.message) setErrormsg(true);
    else setErrormsg(false);
  };

  const getResultGraph = (resultId) => {
    dispatch(rootActions.excelActions.storeResultId(resultId));
    navigate(`/Project/projectId/${projectId}/resultId/${resultId}`);
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
        onClose={() => {
          setOpen(!open), setModel(true), setResult(false), setSearch("");
        }}
        open={open}
        style={{
          borderLeft: "5px solid #3AB0FF",
        }}
      >
        <div
          className={styles.tabHeading}
          style={{
            color: colorModel,
          }}
        >
          <div
            className={styles.tab}
            style={{
              backgroundColor: bgColorModel,
            }}
            onClick={() => {
              setModel(true);
              setSearch("");
              setResult(false);
              setModelData(transformedData);
            }}
          >
            Models
          </div>
          <div
            className={styles.tab}
            style={{
              color: colorResult,
              backgroundColor: bgColorResult,
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
        <div className={styles.tabContainer}>
          {model && !result ? (
            <div className={styles.modelsContainer}>
              <div className={styles.searchModel}>
                <Input
                  placeholder="Search a model.."
                  value={search}
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
                    <div className={styles.tabLoaders}>
                      <Loader />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className={styles.modelsContainer}>
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
                    <div className={styles.tabLoaders}>
                      <Loader />
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.noResults}>No Results Found !</div>
              )}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
