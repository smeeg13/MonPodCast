import { useFormik } from "formik";
import React, { useState } from "react"; 
import { TagsInput } from "react-tag-input-component"; 

  
const LoginForm = () => {

  const formik = useFormik({
    initialValues: {     
      email: "",
      password: ""
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
      password: inputs.password
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
    if(result != null){
  
      navigate('/', { replace: true });
    }
  };

  return (
    <div>
    <form className="w-50" onSubmit={formik.handleSubmit}>
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

      <br />
      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          type="text"
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
     
      <br />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
    </div>
  );
};

export default LoginForm;
