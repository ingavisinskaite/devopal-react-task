import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <div className="MAIN">
      <h2>Welcome to Select component!</h2>
      <p>Choose your mode:</p>
      <div>
        <Link to={"/tags-select"}>Tags</Link>
        <p>
          {props.tagsSelection.length !== 0 &&
            `Current selection: ${props.tagsSelection}`}
        </p>
      </div>
      <div>
        <Link to={"/single-select"}>Single</Link>
        <p>
          {props.singleSelection &&
            `Current selection: ${props.singleSelection}`}
        </p>
      </div>
    </div>
  );
};

export default Home;
