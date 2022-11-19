import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import Login from './pages/Login';
import RedirectToLogin from './components/RedirectLogin';
import { history } from './helpers/history';
import { clearMessage } from './actions/message';
import EventBus from "./common/EventBus";

function App() {
  history.listen(() => {
    clearMessage();
  });
  
  useEffect(() => {
    EventBus.on("logout", () => {
      logout();
    });
    
    return () => {
      EventBus.remove("logout");
    };
  })
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RedirectToLogin />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
      </Routes>
    </Router>
  );
}

export default App;
