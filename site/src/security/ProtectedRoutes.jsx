import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { PublicRoutes } from "../routes/routes";

const ProtectedRoutes = () => {
  const { user_info } = useContext(AppContext);

  return user_info ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default ProtectedRoutes;
