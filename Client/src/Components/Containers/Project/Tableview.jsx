//React imports
import React, { useRef } from "react";
import { debounce } from "lodash";

//Imports from Reusables
import Table from "../../Reusables/Table/table";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { useSelector } from "react-redux";
import {
  useLazyGetExcelQuery,
  useLazyGetGraphQuery,
} from "../../../Redux/ProjectPage/ProjectRtkQuery";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import Loaders from "./loaders";
import ButtonComponent from "../../Reusables/Button/Button";
import LineChart from "../../Reusables/Linechart/lineChart";

const Tableview = ({ getData }) => {
  const columns = useSelector(projectSelector.tableColumns);
  const tableData = useSelector(projectSelector.tableData);
  const pageNo = useSelector(projectSelector.pageNo);
  const id = useSelector(projectSelector.projectId);
  const graphData = useSelector(projectSelector.graphData);
  const graphColumns = useSelector(projectSelector.graphcolumns);
  const [getExcel, getTableData] = useLazyGetExcelQuery() || {};
  const [getGraph, graphResults] = useLazyGetGraphQuery() || {};
  const sheetRef = useRef();
  const handleScroll = (event) => {
    const sheetInstance = sheetRef.current;
    if (
      event.scrollY === sheetInstance.facet.vScrollBar.scrollTargetMaxOffset ||
      0
    ) {
      if (pageNo !== null) {
        getExcel({ projectId: id, pageNo: pageNo });
      }
    }
  };
  const debouncedHandleScroll = debounce(handleScroll, 300);

  const genarateGraph = () => {
    getGraph({ projectId: id });
  };
  console.log(graphResults);
  return (
    <div>
      <div className={styles.loading}>
        {getData.isLoading && (
          <Loaders
            loadingText={"Preparing your Preview..."}
            style={styles.loader}
          />
        )}
      </div>
      {getData.isSuccess && (
        <div className={styles.mainBox}>
          <div className={styles.table}>
            <Table
              columns={columns}
              tableData={tableData}
              onscroll={debouncedHandleScroll}
              sheetRef={sheetRef}
            />
          </div>
          <div className={styles.sidebar}>
            <div>
              <ButtonComponent
                content={"Generate Graph"}
                onclick={genarateGraph}
              />
            </div>
            <div
              style={{
                width: "90%",
                marginTop: "10px",
                height: "44%",
                backgroundColor: "#fff",
                padding: "5px",
              }}
            >
              <p>Actual Graph</p>
              {graphResults.isSuccess && (
                <LineChart
                  data={graphData}
                  columns={graphColumns}
                  line1={"best_fit_X"}
                  line2={"best_fit_Y"}
                  error={false}
                />
              )}
              {graphResults.isLoading || graphResults.isFetching ? (
                <h4>Loading..</h4>
              ) : null}
            </div>
            <div
              style={{
                width: "90%",
                height: "44%",
                marginTop: "10px",
                backgroundColor: "#fff",
                padding: "5px",
              }}
            >
              <p>Error Graph</p>
              {graphResults.isSuccess && (
                <LineChart
                  data={graphData}
                  columns={[]}
                  line1={"error_X"}
                  line2={"error_Y"}
                  error={true}
                />
              )}
              {graphResults.isLoading || graphResults.isFetching ? (
                <h4>Loading..</h4>
              ) : null}
            </div>
          </div>
        </div>
      )}
      <div className={styles.fetching}>
        {getTableData.status === "pending" ? (
          <Loaders loadingText={"Loading..."} style={styles.fetch} />
        ) : null}
      </div>
    </div>
  );
};

export default Tableview;
