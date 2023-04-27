import { useFormik } from "formik";
import React, { useState, navigate } from "react";
import { TagsInput } from "react-tag-input-component";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
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
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/login";
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
      navigate("/", { replace: true });
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className={styles.labelText}>
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className={styles.inputField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <small className={styles.errorMessage}>{formik.errors.name}</small>
          ) : null}
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="password" className={styles.labelText}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.inputField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <small className={styles.errorMessage}>
              {formik.errors.password}
            </small>
          ) : null}
        </div>

        <br />
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <div className={styles.registerLink}>
          <a href="/registerScreen">Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
