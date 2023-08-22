//React Imports
import React, { useEffect, useState } from "react";
//Imports from Reusables
import SpinLoader from "../../Reusables/SpinLoader/spinLoader";
import LineGraph from "../../Reusables/Linechart/lineGraph";
//Redux Imports
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { useSelector } from "react-redux";
import { projectSelector } from "../../../Redux/Root/rootSelector";
//Styles
import styles from "./graph.module.css";
import ButtonComponent from "../../Reusables/Button/Button";
/**
 * Graph component displays two types of graphs: actual graph and error graph.
 *
 * @component
 */
const Graph = () => {
  const [showGraph, getGraph] =
    rootQuery.excelPage.useGetGraphResultMutation() || {};
  const [scatter, setScatter] = useState(false);
  const [buttontext, setButtonText] = useState("scatter");
  const trainX = useSelector(projectSelector.selectedModelX);
  const trainY = useSelector(projectSelector.selectedModelY);

  useEffect(() => {
    const projectId = location.pathname.split("/")[3];
    const modelId = location.pathname.split("/")[5];
    showGraph({
      projectId: projectId,
      modelId: modelId,
      xColumn: trainX,
      yColumn: trainY,
    });
  }, []);

  const scatterView = () => {
    setScatter(!scatter);
    setButtonText(buttontext === "Line" ? "Scatter" : "Line");
  };

  return (
    <div>
      <div className={styles.graphBox}>
        <div className={styles.graphContainer}>
          <div className={styles.heading}>Actual Graph</div>
          <ButtonComponent
            content={`view in ${buttontext} plot`}
            onclick={scatterView}
            loading={false}
          />
        </div>
        <div className={styles.box}>
          {getGraph.isSuccess && getGraph.data.error === null ? (
            <div className={styles.graph}>
              <LineGraph
                bestFit={getGraph.data.bestFitData}
                actualData={getGraph.data.actualData}
                errorData={[]}
                error={false}
                scatter={scatter}
              />
            </div>
          ) : null}
          {getGraph.isLoading && (
            <div>
              <SpinLoader />
            </div>
          )}
        </div>
      </div>
      <div className={styles.graphBox}>
        <div className={styles.graphContainer}>
          <div className={styles.heading}>Error Graph</div>
        </div>
        <br></br>
        <div className={styles.box}>
          {getGraph.isSuccess && getGraph.data.error === null ? (
            <div className={styles.graph}>
              <LineGraph
                bestFit={[]}
                actualData={[]}
                errorData={getGraph.data.errorData}
                error={true}
                scatter={scatter}
              />
            </div>
          ) : null}
          {getGraph.isLoading && (
            <div>
              <SpinLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Graph;
