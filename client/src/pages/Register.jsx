import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };

  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Usuario requerido")
      .max(30, "El usuario no puede tener más de 30 caracteres"),
    password: Yup.string()
      .required("Contraseña requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(30, "La contraseña no puede tener más de 30 caracteres")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      ),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then((response) => {
        console.log(response);
        setError("usuario creado con exito");
      })
      .catch((error) => {
        console.log(error);
        setError("error al crear el usuario");
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <span>{error}</span>
          <label htmlFor="username">Usuario</label>
          <Field id="username" name="username" placeholder="Usuario" />
          <ErrorMessage name="username" component="span" />
          <label htmlFor="password">Contraseña</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
          />
          <ErrorMessage name="password" component="span" />
          <button type="submit">Registrarse</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
