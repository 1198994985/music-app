import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import routeConfigs from "./routes";
import "./App.scss";

const App: React.FC = () => {
  return <Router>{renderRoutes(routeConfigs)}</Router>;
};

export default App;
