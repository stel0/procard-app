import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { PrivateRoutes } from "../routes/routes";

function ProtectedRoutesAdmin() {
  const { user_info } = useContext(AppContext);

  return user_info.role || user_info.is_staff ? <Outlet /> : <Navigate replace to={PrivateRoutes.HOME} />;
}

export default ProtectedRoutesAdmin;
