import { useForm } from "react-hook-form";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { PrivateRoutes, PublicRoutes } from "../routes/routes.js";
import { login_user } from "../api/video.api";

function Landing() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const res = await login(data);
    typeof res === "object" && res !== null
      ? navigate(PrivateRoutes.HOME) 
      : navigate(PublicRoutes.LOGIN);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
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
        </form>
      </div>
      {/* <div>
        <p>Eres nuevo?</p>
        <Link to={PrivateRoutes.CREATE_ACCOUNT}>Crear cuenta</Link>
      </div> */}
    </>
  );
}

export default Landing;
