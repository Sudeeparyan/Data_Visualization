import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { projectSelector } from "../../../Redux/Root/rootSelector";

const Graph = () => {
  const modelId = useSelector(projectSelector.modelId);
  console.log("yes");

  const [showGraph, getGraph] =
    rootQuery.excelPage.useLazyGetGraphResultQuery() || {};

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    showGraph({ projectId: path, modelId: modelId });
  }, []);

  return (
    <div>
      <div style={{ height: "92vh", backgroundColor: "blue" }}>
        <div>Actual Graph</div>
        <div style={{ height: "100%", backgroundColor: "red" }}></div>
      </div>
      <div style={{ height: "92vh", backgroundColor: "grey" }}>
        <div>Error Graph</div>
        <div style={{ height: "100%", backgroundColor: "pink" }}></div>
      </div>
    </div>
  );
};

export default Graph;
