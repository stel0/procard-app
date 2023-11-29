import { NavLink, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Nav() {
  const { logout, user_info, hasPermissions } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PublicRoutes.LOGIN);
  };

  return (
    <div>
      <NavLink to={PrivateRoutes.HOME}>Inicio</NavLink>
      <NavLink to={PrivateRoutes.COURSES}>Cursos</NavLink>
      {hasPermissions && (
        <NavLink to={PrivateRoutes.ADMIN_PANEL}>
          Panel de administrador{" "}
        </NavLink>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Nav;
