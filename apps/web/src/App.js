import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
import Login from './pages/Login';
import RedirectToLogin from './components/RedirectLogin';

function App() {
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
