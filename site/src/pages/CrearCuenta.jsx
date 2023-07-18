import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { z } from "zod";

function CrearCuenta() {
  const User = z
    .object({
      name: z.string().toLowerCase().max(50).min(2),
      last_name: z
        .string({
          required_error: "Apellidos es requerido",
          invalid_type_error: "Apellidos deben ser letras",
        })
        .toLowerCase()
        .max(50)
        .min(2, { message: "Debe ser mayor a 2 caracteres" }),
      ci: z.number().int().nonnegative().positive().min(1).max(99999999),
      mail: z
        .string()
        .min(3, { message: "Debe ser mayor a 3 caracteres" })
        .email({ message: "Debe ser un correo valido" }),
      genre: z
        .string()
        .toUpperCase()
        .max(1, { message: "Debe ser un genero valido" })
        .refine(
          (value) => value === "M" || value === "F" || value === "N",
          "Debe ser un genero valido"
        ),
      password: z.string().min(8, { message: "Debe ser mayor a 8 caracteres" }),
      confirm_password: z
        .string()
        .min(8, { message: "Debe ser mayor a 8 caracteres" }),
    })
    .superRefine(({ confirm_password, password }, ctx) => {
      if (password !== confirm_password) {
        ctx.addIssue({
          code: "custom",
          message: "Las contraseñas no coinciden",
          path: ["confirm_password", "password"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { submitForm } = useContext(AppContext);

  function submitUserForm(data) {
    data.ci = Number(data.ci);
    try {
      User.parse(data);
    } catch (error) {
      for(const key in error){
        console.log(error[key]);
      }
      
    }
   
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
          <input type="number" {...register("ci", { required: true })} />
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

          <label>Contraseña:</label>
          <input type="text" {...register("password", { required: true })} />
          {errors.password && <span>Campo incorrecto.</span>}

          <label>Repetir contraseña:</label>
          <input
            type="text"
            {...register("confirm_password", { required: true })}
          />
          {errors.confirm_password && <span>Campo incorrecto.</span>}

          <button>Crear cuenta</button>
        </form>
      </div>
    </>
  );
}

export default CrearCuenta;
