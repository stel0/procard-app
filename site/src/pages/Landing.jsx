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

  const { logInVerification, users } = useContext(AppContext);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(logInVerification)}>
          <input
            type="text"
            placeholder="Ingresa tu cedula."
            {...register("ci", {
              required: true,
              maxLength: {
                value: 8,
                message: "La cedula no puede ser mayor a 8 letras.",
              },
              validate: (value) => {
                const data = users.data.find((element) => element.ci === value);
                if (!data) return "No existe el usuario.";
              },
            })}
          />
          {errors.ci && <span>{errors.ci.message}</span>}

          <input
            type="text"
            placeholder="Ingresa la contraseña."
            {...register("password", { required: true })}
          />
          {errors.password && <span>La contraseña es incorrecta.</span>}

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
