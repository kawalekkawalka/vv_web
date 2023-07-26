import React from "react";
import './App.css';
import 'react-notifications/lib/notifications.css';
import Navbar from "./components/layout/navbar";
import Main from "./components/layout/main";
import {BrowserRouter as Router} from "react-router-dom";
import theme from './theme'
import {ThemeProvider} from "@mui/material";
import {AuthProvider} from "./hooks/useAuth";
import {NotificationContainer} from 'react-notifications';

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
          <NotificationContainer/>
          </AuthProvider>
      </ThemeProvider>

  );
}

export default App;
