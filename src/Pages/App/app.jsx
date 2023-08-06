import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../Dashboard_page/dashboardPage";
import Navbar from "../../Components/Reusables/Navbar/Navbar";
import Project from "../../Components/Containers/Project/project";
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
          <Route path="/" element={<DashboardPage />} />
          <Route path="/Excel/:id" element={<Project />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
