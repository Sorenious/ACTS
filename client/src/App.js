import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Introduction from "./pages/Introduction";
import NoMatch from "./pages/NoMatch";
import "./App.css";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Introduction} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;