import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExcelPage from "../Excel_page/excelPage";
import Navbar from "../../Reusables/Navbar/Navbar";
import Project from "../../Containers/Project/project";
import DashboardPage from "../Dashboard/dashboardPage";
/**
 * App Component is the main entry point of the application. It sets up the routing for the different pages and renders the Navbar.
 *
 * @returns {JSX.Element} The JSX representation of the App component.
 */
const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExcelPage />} />
          <Route path="/Excel/:id" element={<Project />} />
          <Route path="*" element={<ExcelPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
