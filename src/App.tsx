import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import routeConfigs from "./routes";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>{renderRoutes(routeConfigs)}</Router>
    </Provider>
  );
};

export default App;
