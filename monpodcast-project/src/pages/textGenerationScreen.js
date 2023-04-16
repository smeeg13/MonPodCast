import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function textGeneratinoPage  () {

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);


  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    
    axios.post('http://localhost:5000/my-endpoint', formData)
      .then(response => {
        setOutput(response.data.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("ERROR IN THE REQUEST !!!!!!")
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <br ></br>      <br ></br>      <br ></br>      <br ></br>      <br ></br>      <br ></br>      <br ></br>
      
      <input type="file" accept=".mp4" onChange={handleFileSelect} />
      <br></br>
      <br></br>
      <button disabled={!selectedFile} onClick={handleFileUpload}>
        Upload File
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      {loading ? <div className="spinner-container">
          <ClipLoader size={70} color="#123abc" loading={loading} />
        </div> : <div>{output}</div>}
    </div>  
    <br></br>
      <br></br>
      <br></br>
    
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}