import { useFormik } from "formik";
import React, { useState } from "react"; 
import { TagsInput } from "react-tag-input-component"; 

  
export default function textForm() {


  // Handles the submit event on form submit.
  const handleClick = async () => {
    const response = await axios.post('/run-python', {
      pythonScript: 'IA/main.py',
    });
    setResult(response.data);
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

      <button onClick={handleClick}>Run Python Script</button>
      <p>{result}</p>
      <br />
    </form>
    </div>
  );
};

