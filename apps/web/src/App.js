import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";
import RedirectLogin from "./components/RedirectLogin";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<RedirectLogin />} />
          <Route exact path="/dashboard" element={<RequireAuth loginPath="/login"><Dashboard /></RequireAuth>} />
          <Route exact path="/new" element={<RequireAuth loginPath="/login"><New /></RequireAuth>} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
