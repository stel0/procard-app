import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { PrivateRoutes } from "../routes/routes";




function ProtectedRoutesAdmin() {
  const { hasPermissions } = useContext(AppContext);

  return hasPermissions ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.HOME} />
  );
}

export default ProtectedRoutesAdmin;
