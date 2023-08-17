import React, { useEffect } from "react";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import LineGraph from "../../Reusables/Linechart/lineGraph";

const Graph = () => {
  const [showGraph, getGraph] =
    rootQuery.excelPage.useLazyGetGraphResultQuery() || {};
  useEffect(() => {
    const projectId = location.pathname.split("/")[2];
    const modelId = location.pathname.split("/")[3];
    showGraph({ projectId: projectId, modelId: modelId });
  }, []);

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#E8E8E8",
            fontSize: "18px",
          }}
        >
          Actual Graph
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
          }}
        >
          {getGraph.isSuccess && getGraph.data.error === null ? (
            <div style={{ width: "40%" }}>
              <LineGraph
                bestFit={getGraph.data.actualData}
                actualData={getGraph.data.bestFitData}
                errorData={[]}
                error={false}
              />
            </div>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#E8E8E8",
            fontSize: "18px",
          }}
        >
          Error Graph
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          {getGraph.isSuccess && getGraph.data.error === null ? (
            <div style={{ width: "40%" }}>
              <LineGraph
                bestFit={[]}
                actualData={[]}
                errorData={getGraph.data.errorData}
                error={true}
              />
            </div>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Graph;
