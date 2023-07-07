import React from "react";
import './App.css';
import Navbar from "./components/navbar";
import Main from "./components/main";
import {BrowserRouter as Router} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Main/>
        </Router>
    </div>
  );
}

export default App;
