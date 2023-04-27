import { useFormik } from "formik";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styles from "../styles/RegisterForm.module.css";

const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (event) => {
      handleSubmit(event);
    },
  });

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // event.preventDefault();
    const inputs = event;
    // Get data from the form.
    const data = {
      email: inputs.email,
      password: inputs.password,
      username: inputs.username,
    };

    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/_register";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    const result = await response.json();
    alert(`${result.data}`);
    if (result != null) {
    }
  };

  return (
    <div className={styles.registerFormContainer}>
      <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <small className="form-text text-muted">{formik.errors.name}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <small className="form-text text-muted">{formik.errors.name}</small>
          ) : null}
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type={passwordShown ? "text" : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <small className="form-text text-muted">
              {formik.errors.description}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="conf_password">vérification du mot de passe</label>
          <input
            type={passwordShown ? "text" : "password"}
            id="conf_password"
            name="conf_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <small className="form-text text-muted">
              {formik.errors.description}
            </small>
          ) : null}
        </div>

        <br />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
