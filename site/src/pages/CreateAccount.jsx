import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function CrearCuenta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { submitForm, createUserMsg } = useContext(AppContext);

  function submitUserForm(data) {
    console.log("Cargando datos...");
    submitForm(data, "user");
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitUserForm)}>
          <label>Nombre:</label>
          <input
            type="text"
            {...register("name", {
              required: "Nombre es requerido.",
              minLength: {
                value: 3,
                message: "El nombre no puede ser menor a 3 letras.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede ser mayor a 50 letras.",
              },
              pattern: {
                value: /^[a-zA-Z]+$/i,
                message: "El nombre solo puede contener letras.",
              },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
          <label>Apellidos:</label>
          <input
            type="text"
            {...register("last_name", {
              required: true,
              minLength: {
                value: 3,
                message: "El apellido no puede ser menor a 3 letras.",
              },
              maxLength: {
                value: 50,
                message: "El apellido no puede ser mayor a 50 letras.",
              },
              pattern: {
                value: /^[a-zA-Z]+$/i,
                message: "El apellido solo puede contener letras.",
              },
            })}
          />
          {errors.last_name && <span>{errors.last_name.message}</span>}
          <label>Cedula (sin puntos):</label>
          <input
            type="text"
            {...register("ci", {
              required: "Se requiere la cedula.",
              maxLength: {
                value: 8,
                message: "La cedula no puede ser mayor a 8 digitos.",
              },
              pattern: {
                value: /^[0-9]+$/i,
                message: "La cedula solo puede contener numeros sin puntos.",
              },
            })}
          />
          {errors.ci && <span>{errors.ci.message}</span>}
          <label>Correo:</label>
          <input
            type="text"
            {...register("mail", {
              required: "Correo es requerido.",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "El correo no es valido.",
              },
            })}
          />
          {errors.mail && <span>{errors.mail.message}</span>}
          <label>Sexo:</label>
          <select
            name="genre"
            {...register("genre", {
              required: true,
              pattern: {
                value: /^(M|F|N)$/,
                message: "El sexo no es valido.",
              },
            })}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="N">Ninguno</option>
          </select>
          {errors.genre && <span>{errors.genre.message}</span>}
          <label>Contraseña:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            {...register("password", {
              required: "La contraseña es requerida.",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres.",
              },
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+[{\]};:'",<.>/?])(?!.*\s).*$/,
                message:
                  "Debe contener un número, una letra mayuscula y un caracter especial(!@#$%^&*.)",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <label>Repetir contraseña:</label>
          <input
            type="password"
            {...register("confirm_password", {
              required: "Confirmar contraseña es requerida",
              validate: (value) => {
                return value !== document.getElementById("password").value
                  ? "Las contraseñas no coinciden."
                  : null;
              },
            })}
          />
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
          )}

          <select
            name="permissions"
            {...register("permissions", {
              required: true,
              validate: (value) => {
                return value === "admin" || value === "user"
                  ? null
                  : "El rol no es valido.";
              },
            })}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.permissions && <span>{errors.permissions.message}</span>}

          <button>Crear cuenta</button>

          {/*Show the errors from the server side.*/}
          {createUserMsg}
        </form>
      </div>
    </>
  );
}

export default CrearCuenta;
