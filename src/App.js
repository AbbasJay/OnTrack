import React, { Component } from "react";
import ShowResults from "./showResults";
import HomePage from "./homePage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="nav-container">
            <div className="nav-bar">
              <Link to="/" className="route-link">
                Home Page
              </Link>
              <Link to="/results/1" className="route-link">
                Results
              </Link>
            </div>
          </nav>
          <Route path="/" exact component={HomePage} />
          <Route path="/results/:id" component={ShowResults} />
        </div>
      </Router>
    );
  }
}

export default App;
