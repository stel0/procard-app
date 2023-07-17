import {NavLink} from 'react-router-dom'

function Nav() {
  return (
    <div>
      <NavLink to="/home">Inicio</NavLink>
      <NavLink to="/cursos">Cursos</NavLink>
    </div>
  );
}

export default Nav