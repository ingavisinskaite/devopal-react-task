import React from "react";
import "./App.css";
import Select from "./components/select";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/single-select"
          render={props => <Select {...props} mode="single" />}
        />
        <Route
          path="/multiple-select"
          render={props => <Select {...props} mode="multiple" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
