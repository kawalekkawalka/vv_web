import React from "react";
import './App.css';
import Navbar from "./components/navbar";
import Main from "./components/main";
import {BrowserRouter as Router} from "react-router-dom";
import theme from './theme'
import {ThemeProvider} from "@mui/material";
import {AuthProvider} from "./hooks/useAuth";

function App() {

    const user = JSON.parse(localStorage.getItem('vv-user'));

  return (
      <ThemeProvider theme={theme}>
          <AuthProvider user={user}>
              <div className="App">
                <Router>
                    <Navbar/>
                    <Main/>
                </Router>
              </div>
          </AuthProvider>
      </ThemeProvider>

  );
}

export default App;
