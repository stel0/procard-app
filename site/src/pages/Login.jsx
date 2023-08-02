import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { PrivateRoutes } from "../routes/routes.js";

function Landing() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { login, userLoginMsg, loggedUser } = useContext(AppContext);

  useEffect(() => {
    console.log(loggedUser.name)
    if (loggedUser.name) navigate(PrivateRoutes.HOME);
  }, [loggedUser.name]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(login)}>
          <input
            type="text"
            placeholder="Ingresa tu cedula."
            {...register("ci", {
              required: "La cedula es necesario.",
            })}
          />
          {errors.ci && <span>{errors.ci.message}</span>}

          <input
            type="text"
            placeholder="Ingresa la contraseña."
            {...register("password", {
              required: "La contraseña es necesaria.",
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <button>Iniciar sesion</button>
          {userLoginMsg}
        </form>
      </div>
      <div>
        <p>Eres nuevo?</p>
        <Link to={PrivateRoutes.CREATE_ACCOUNT}>Crear cuenta</Link>
      </div>
    </>
  );
}

export default Landing;
