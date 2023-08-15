/**
 * Excel Selector
 *
 * This file defines a selector for extracting Excel-related data from the Redux state using the `reselect` library.
 * The selector takes the root state object and retrieves the relevant data from the 'Excel_Csv' slice of the state.
 */

import { createSelector } from "reselect";

const ProjectState = (state) => state.Excel_Csv;

export const projectId = createSelector(
  [ProjectState],
  (project) => project.ProjectId
);
export const tableColumns = createSelector(
  [ProjectState],
  (project) => project.ExcelColumns
);
export const tableData = createSelector(
  [ProjectState],
  (project) => project.ExcelCsv
);
export const pageNo = createSelector([ProjectState], (project) => project.pgNo);
export const graphData = createSelector(
  [ProjectState],
  (project) => project.Graph
);
export const graphcolumns = createSelector(
  [ProjectState],
  (project) => project.graphColumn
);
