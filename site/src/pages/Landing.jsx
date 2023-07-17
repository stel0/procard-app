import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Landing() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { logInVerification } = useContext(AppContext);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(logInVerification)}>
          <input
            type="text"
            placeholder="Ingresa el usuario."
            {...register("cedula", { required: true })}
          />
          {errors.cedula && <span>El nombre del usuario es incorrecto</span>}

          <input
            type="text"
            placeholder="Ingresa la contraseña."
            {...register("password_user", { required: true })}
          />
          {errors.password_user && <span>La contraseña es incorrecta.</span>}

          <button>Entrar</button>
        </form>
      </div>
      <div>
        <p>Eres nuevo?</p>
        <Link to="/crear-cuenta">Crea una cuenta ;)</Link>
      </div>
    </>
  );
}

export default Landing;
