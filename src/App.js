import React from "react";
import Dashboard from "./components/pages/Dashboard";
import Task from "./components/pages/Task";
import NotFound from "./components/pages/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
       <Route exact path={'/'} component={Dashboard}/>
       <Route path={'/project/:id'} component={Task}/>
       <Route path={"*"} component={NotFound}/>
    </Switch>
    </Router>    
  );
}

export default App;
