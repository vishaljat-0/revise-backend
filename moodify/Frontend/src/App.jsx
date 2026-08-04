import React from "react";
import { router } from "./app.route";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Auth/auth.context";

import "./shared/styles/global.scss";
import "./shared/styles/btn.scss";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
