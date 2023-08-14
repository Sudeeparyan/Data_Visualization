/**
 * Project Component
 *
 * The Project component is a React functional component that represents a project page
 * with an Excel table.
 * @returns {JSX.Element} The rendered Project element.
 */

//React Imports
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetExcelQuery } from "../../Redux/ProjectPage/ProjectRtkQuery";
import { rootSelector } from "../../Redux/Root/rootSelector";
import { rootActions } from "../../Redux/Root/rootActions";
import Tableview from "../../Components/Containers/Project/Tableview";

const Project = () => {
  const pageNo = useSelector(rootSelector.Project.projectData.pageNo);
  const dispatch = useDispatch();
  const location = useLocation();
  const [getExcel, getData] = useLazyGetExcelQuery() || {};

  /**
   * useEffect Hook
   * This hook is used to fetch Excel data based on the current path when the component mounts.
   */

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    getExcel({ projectId: path, pageNo: pageNo });
    dispatch(rootActions.excelActions.storeExcelid({ projectId: path }));
  }, []);

  return (
    <div>
      <Tableview getData={getData} />
    </div>
  );
};

export default Project;
