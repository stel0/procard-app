import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { PrivateRoutes } from "../routes/routes";

function ProtectedRoutesAdmin() {
  const { isLogged } = useContext(AppContext);

  return isLogged ? <Outlet /> : <Navigate replace to={PrivateRoutes.HOME} />;
}

export default ProtectedRoutesAdmin;
