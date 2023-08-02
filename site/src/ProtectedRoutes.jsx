import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import { PublicRoutes } from "./routes/routes";

const ProtectedRoutes = () => {
  const { loggedUser } = useContext(AppContext);

  return loggedUser.name ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default ProtectedRoutes;
