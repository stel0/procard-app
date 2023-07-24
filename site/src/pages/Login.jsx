import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { PrivateRoutes } from '../routes/routes.js'

function Landing() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { login, users, loginError } = useContext(AppContext);

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
          {loginError === "password" && (
            <span>La contraseña es incorrecta</span>
          )}

          <button>Entrar</button>
          {loginError === "user" && (
            <span>La contraseña o cedula es incorrecta</span>
          )}
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
