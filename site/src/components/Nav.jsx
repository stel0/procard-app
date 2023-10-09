import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Nav() {
  const { logout, user_info } = useContext(AppContext);
  const navigate = useNavigate();
  const [hasPermissions, setHasPermissions] = useState();


  const handleLogout = () => {
    try {
      const res = logout;
      navigate(PublicRoutes.LOGIN);
    } catch (error) {
      console.error("An error is ocurred", error);
    }
  };
  return (
    <div>
      <NavLink to={PrivateRoutes.HOME}>Inicio</NavLink>
      <NavLink to={PrivateRoutes.COURSES}>Cursos</NavLink>
      {(user_info.role == 1 || user_info.is_staff) &&
        <NavLink to={PrivateRoutes.ADMIN_PANEL} >Panel de administrador </NavLink>
      }
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Nav;
