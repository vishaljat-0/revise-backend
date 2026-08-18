import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function Protected() {
  const {user,loading} = useSelector((state) => state.auth);


  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default Protected;
