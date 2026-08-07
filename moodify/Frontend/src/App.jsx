import React from "react";
import { router } from "./app.route";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Auth/auth.context";

import "./shared/styles/global.scss";
import "./shared/styles/btn.scss";
import { Homeprovider } from "./home/home.context";

function App() {
  return (
    <AuthProvider>
      <Homeprovider>
        <RouterProvider router={router} />
      </Homeprovider>
    </AuthProvider>
  );
}

export default App;
