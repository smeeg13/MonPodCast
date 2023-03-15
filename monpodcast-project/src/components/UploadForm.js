import { useFormik } from "formik";
import React, { useState } from "react"; 
import { TagsInput } from "react-tag-input-component"; 
  
const UploadForm = () => {
  const [tagSelected, setTagSelected] = useState(["gfg"]);

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {     
      name: "",
      description: "",
      url: "",
      date: new Date().toISOString().split("T")[0],
      duration: 0,
      tags: tagSelected,
      image: "",
      nameCat: "",
      controlFile:""
    },
    validate,
    onSubmit: (event) => {
      console.log("submit add new podacast");
      handleSubmit(event);
    },
  });

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
   // event.preventDefault();
    const inputs = event;
    // Get data from the form.
    const data = {
      name: inputs.name,
      description: inputs.description,
      url: inputs.url,
      date: inputs.date,
      duration: inputs.duration,
      tags: inputs.tags,
      image: inputs.image,
      nameCat: inputs.nameCat,
      controlFile: inputs.controlFile
    };
    console.log('file selected ::', inputs.controlFile)

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/upload";
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
  };

  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name Podcast</label>
        <input
          type="text"
          id="name"
          name="name"
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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
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
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
        />
        {formik.touched.url && formik.errors.url ? (
          <small className="form-text text-muted">{formik.errors.url}</small>
        ) : null}
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="date">Creation Date of the podcast</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
                {formik.touched.date && formik.errors.date ? (
          <small className="form-text text-muted">{formik.errors.date}</small>
        ) : null}
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="duration">Duration of the podcast</label>
        <input
          type="number"
          id="duration"
          name="duration"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.duration}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          name="image"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
      </div>
      <br />
      <div className="form-group">
        {/* //TODO tags entered */}
        <label htmlFor="tags">Tags related</label>
      <TagsInput
        onBlur={formik.handleBlur}
        value={formik.values.tags}
        onChange={setTagSelected}
        name="tags"
        placeHolder="tags"
      />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="nameCat">Category Name  </label>
        <input
          type="text"
          id="nameCat"
          name="nameCat"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nameCat}
        />
      </div>
      <br />
      {/* //TODO selection du fichier */}
      <div className="form-group">
        <label htmlFor="controlFile">Select the podcast's file :</label>
        <input
          type="file"
          className="form-control-file"
          id="controlFile"
          name="controlFile"
        />
      </div>
      <br />
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length < 10) {
    errors.description = "Must be 10 characters or more";
  }

  if (!values.url) {
    errors.url = "Required";
  }

  if (new Date(values.date) <= new Date(new Date().toDateString())) {
    errors.date = "Must be before or on today";
  }

  return errors;
};

export default UploadForm;
