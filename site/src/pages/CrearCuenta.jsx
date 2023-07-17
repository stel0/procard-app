import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function CrearCuenta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { submitForm } = useContext(AppContext);

  function submitUserForm(data) {
    submitForm(data, "user");
  }
  

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitUserForm)}>
          <label>Nombre:</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span>Campo incorrecto.</span>}

          <label>Apellidos:</label>
          <input type="text" {...register("last_name", { required: true })} />
          {errors.last_name && <span>Campo incorrecto.</span>}

          <label>Cedula:</label>
          <input type="text" {...register("ci", { required: true })} />
          {errors.ci && <span>Campo incorrecto.</span>}

          <label>Correo:</label>
          <input type="text" {...register("mail", { required: true })} />
          {errors.mail && <span>Campo incorrecto.</span>}

          <label>Sexo:</label>
          <select name="genre" {...register("genre")}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="N">Ninguno</option>
          </select>

          <button>Crear cuenta</button>
        </form>
      </div>
    </>
  );
}

export default CrearCuenta;
