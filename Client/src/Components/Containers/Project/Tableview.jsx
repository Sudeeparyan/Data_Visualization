//React imports
import React, { useRef } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
//Imports from Reusables
import Table from "../../Reusables/Table/table";
//Import from Styles
import styles from "./project.module.css";
//Redux Imports
import { useSelector } from "react-redux";
import { rootQuery } from "../../../Redux/Root/rootQuery";
import { projectSelector } from "../../../Redux/Root/rootSelector";
import Loaders from "./loaders";
import ButtonComponent from "../../Reusables/Button/Button";

const Tableview = ({ getData }) => {
  const navigate = useNavigate();
  const columns = useSelector(projectSelector.tableColumns);
  const tableData = useSelector(projectSelector.tableData);
  const modelId = useSelector(projectSelector.modelId);
  const projectId = useSelector(projectSelector.projectId);
  const pageNo = useSelector(projectSelector.pageNo);
  const id = useSelector(projectSelector.projectId);
  const [getExcel, getTableData] =
    rootQuery.excelPage.useLazyGetExcelQuery() || {};
  const [sendProject, getProject] =
    rootQuery.excelPage.useGenerateGraphMutation() || {};
  const sheetRef = useRef();
  const handleScroll = (event) => {
    const sheetInstance = sheetRef.current;
    if (
      event.scrollY === sheetInstance.facet.vScrollBar.scrollTargetMaxOffset ||
      0
    ) {
      if (pageNo !== null) {
        console.log("test");
        getExcel({ projectId: id, pageNo: pageNo });
      }
    }
  };
  const debouncedHandleScroll = debounce(handleScroll, 300);
  const genarateGraph = async () => {
    const res = await sendProject({ projectID: id });
    console.log(res);
    navigate(`/Project/${projectId}/${res.data.modelID}`);
  };
  return (
    <div>
      <div className={styles.loading}>
        {getData.isFetching && (
          <Loaders
            loadingText={"Preparing your Preview..."}
            style={styles.loader}
          />
        )}
      </div>
      {getData.isSuccess && tableData.length > 0 ? (
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
                loading={getProject.isLoading || getProject.isFetching}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.fetching}>
        {getTableData.status === "pending" ? (
          <Loaders loadingText={"Loading..."} style={styles.fetch} />
        ) : null}
      </div>
    </div>
  );
};

export default Tableview;
