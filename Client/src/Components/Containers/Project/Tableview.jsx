//React imports
import React, { useRef } from "react";
import { debounce } from "lodash";

//Imports from Reusables
import Table from "../../Reusables/Table/table";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { useSelector } from "react-redux";
import { useLazyGetExcelQuery } from "../../../Redux/ProjectPage/ProjectRtkQuery";
import { rootSelector } from "../../../Redux/Root/rootSelector";
import Loaders from "./loaders";
import ButtonComponent from "../../Reusables/Button/Button";
import LineChart from "../../Reusables/Linechart/lineChart";

const Tableview = ({ getData }) => {
  const columns = useSelector(rootSelector.Project.projectData.tableColumns);
  const tableData = useSelector(rootSelector.Project.projectData.tableData);
  const pageNo = useSelector(rootSelector.Project.projectData.pageNo);
  const id = useSelector(rootSelector.Project.projectData.projectId);
  const [getExcel, getTableData] = useLazyGetExcelQuery() || {};
  const sheetRef = useRef();
  console.log(getTableData);
  const handleScroll = (event) => {
    const sheetInstance = sheetRef.current;
    if (
      event.scrollY === sheetInstance.facet.vScrollBar.scrollTargetMaxOffset
    ) {
      if (pageNo !== null) {
        getExcel({ projectId: id, pageNo: pageNo });
      }
    }
  };
  const debouncedHandleScroll = debounce(handleScroll, 300);

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
              <ButtonComponent content={"Generate Graph"} />
            </div>
            <div style={{ width: "100%" }}>
              <LineChart />
            </div>
            <div></div>
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
