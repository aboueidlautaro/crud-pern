import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    description: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Ingresa un título"),
    description: Yup.string().required("Ingresa una descripción"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/articles", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Título: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Título del articulo"
          />
          <label>Previsualización </label>
          <ErrorMessage name="description" component="span" />
          <Field
            as="textarea"
            autoComplete="off"
            name="description"
            placeholder="Descripción del articulo"
          />

          <div>
            <button type="submit">Crear noticia</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateArticle;
