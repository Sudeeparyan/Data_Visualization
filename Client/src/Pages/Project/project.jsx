/**
 * Project Component
 *
 * The Project component is a React functional component that represents a project page
 * with an Excel table.
 * @returns {JSX.Element} The rendered Project element.
 */

//React Imports
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";

//Imports from Reusables
import Table from "../../Components/Reusables/Table/table";
import Loader from "../../Components/Reusables/Spinner/loader";
//Styles Import
import styles from "./project.module.css";
//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetExcelQuery } from "../../Redux/ProjectPage/ProjectRtkQuery";
import { rootSelector } from "../../Redux/Root/rootSelector";
import { rootActions } from "../../Redux/Root/rootActions";

const Project = () => {
  const columns = useSelector(rootSelector.Project.projectData.tableColumns);
  const tableData = useSelector(rootSelector.Project.projectData.tableData);
  const pageNo = useSelector(rootSelector.Project.projectData.pageNo);
  const id = useSelector(rootSelector.Project.projectData.projectId);
  const dispatch = useDispatch();
  const location = useLocation();
  const [getExcel, getData] = useLazyGetExcelQuery() || {};
  const sheetRef = useRef();

  /**
   * useEffect Hook
   * This hook is used to fetch Excel data based on the current path when the component mounts.
   */

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    getExcel({ projectId: path, pageNo: pageNo });
    dispatch(rootActions.excelActions.storeExcelid({ projectId: path }));
  }, []);

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
          <div className={styles.loader}>
            <div>
              <Loader />
            </div>
            <h4>Preparing your Preview...</h4>
          </div>
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
        </div>
      )}
      <div className={styles.fetching}>
        {getData.isFetching && getData.data ? (
          <div className={styles.fetch}>
            <div>
              <Loader />
            </div>
            <h3>Loading...</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Project;
