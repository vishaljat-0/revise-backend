import React from "react";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import Approutes from "./Approute";
import { AuthProvider } from "./features/auth/store/auth.context";

function App() {
  return (
    <AuthProvider>
      <Approutes />
    </AuthProvider>
  );
}

export default App;
