import { NavLink } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes/routes";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Nav() {
  const { logout } = useContext(AppContext);
  return (
    <div>
      <NavLink to={PrivateRoutes.HOME}>Inicio</NavLink>
      <NavLink to={PrivateRoutes.COURSES}>Cursos</NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Nav;
