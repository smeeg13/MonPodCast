import { useFormik } from "formik";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { getDuration } from "../../utils/tools";
import axios from 'axios';






export default function UploadForm({ categories, series, user }) {
  const [tagSelected, setTagSelected] = useState([]);

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
      nameSer: "",
      controlFile: "",
    },
    validate,
    onSubmit: (event) => {
      console.log("submit add new podacast");
      handleSubmit(event);
    },
  });

  // Handles the submit event on form submit.
  const handleSubmit = async (inputs) => {
    const selectedFile = document.getElementById("controlFile").files[0];
    console.log("file selected ::", selectedFile);
    var durationFormFile = -1;
    if (selectedFile != null) {
      durationFormFile = getDuration(selectedFile);
    }
  


    // Get data from the form.
    const data = {
      name: inputs.name,
      description: inputs.description,
      url: inputs.url,
      date: inputs.date,
      duration: durationFormFile != -1 ? durationFormFile : 0,
      tags: tagSelected,
      image: inputs.image,
      nameCat: inputs.nameCat,
      nameSer: inputs.nameSer,
      controlFile: selectedFile,
    };
    console.log("DATA PASSED TO REQUEST ::", data);

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/upload";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    // Send the form data to our forms API and get a response.
    const response = await fetch(endpoint, options);
    console.log("request sent");

    // Get the response data from server as JSON.
    const result = await response.json();
    console.log("response received");

    alert(`${result.data}`);
    //TODO: go back to the pdcast page
  };

  function handleClick() {
    axios.get('/my-python-endpoint')
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
          name="url"handleClick
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
      <br/>
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
      {/* If User is Admin : Can create new Category or Serie instead or just choosing one*/}
      {user.is_admin ? (
        <div>
        <div className="form-group">
        <label htmlFor="nameCat">Choose or Create a Category : </label>

        <input
          list="list-cat"
          id="nameCat"
          name="nameCat"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nameCat}
        />
        <datalist id="list-cat">
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </datalist>
      </div>
    <br />
    <div className="form-group">
        <label htmlFor="nameSer">Choose or Create a Series : </label>

        <input
            list="list-ser"
            id="nameSer"
            name="nameSer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameSer}
        />
        <datalist id="list-ser">
            {series.map((ser) => (
                <option key={ser.id} value={ser.name}>
                    {ser.name}
                </option>
            ))}
        </datalist>
    </div>
    </div>
        ) 
        : 
        <div>
        <div className="form-group">
        <label htmlFor="nameCat">Choose a Category : </label>

        <input
          hidden='true'
          list="list-cat"
          id="nameCat"
          name="nameCat"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nameCat} 
        />
        <select id="list-cat">
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    <br />
    <div className="form-group">
        <label htmlFor="nameSer">Choose or Create a Series : </label>

        <input
                  hidden='true'
            list="list-ser"
            id="nameSer"
            name="nameSer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nameSer}
        />
        <select id="list-ser">
            {series.map((ser) => (
                <option key={ser.id} value={ser.name}>
                    {ser.name}
                </option>
            ))}
        </select>
    </div>
    </div>
          }
      

      <br />
      {/* //TODO selection du fichier */}
      <div className="form-group">
        <label htmlFor="controlFile">Select the podcast's file :</label>
        <input
          type="file"
          className="form-control-file"
          id="controlFile"
          name="controlFile"
          accept="audio/*"
        />
      </div>
      <br />
      <br />

      <button onClick={handleClick}>Call Python Script</button>


      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

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
  if (!values.nameCat) {
    errors.nameCat = "Required";
  }

  if (!values.nameSer) {
    errors.nameSer = "Required";
  }

  return errors;
};
