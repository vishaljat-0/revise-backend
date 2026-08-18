import React, { useEffect } from "react";
import AppRouter from "../Routes/App.Router";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../Feature/Auth/hook/useAuth";

function App() {
  const { handlegetme } = useAuth();

  useEffect(() => {
    handlegetme();
  }, []);
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      
    </>
    
  );
}

export default App;
