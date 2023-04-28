import { LineAxisOutlined, Timer } from '@mui/icons-material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function textGeneratinoPage  () {

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [duration, setDuration] =  useState(0); 
  const [timer, setTimer] = useState(0); 
  const [finaltime,setfinaltime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  const Duration_minutes = Math.floor(duration / 60);
  const Duration_remainingSeconds = (duration % 60).toFixed(0);
  const DurationFormated = `${Duration_minutes} minute(s) and ${Duration_remainingSeconds} second(s)`;

  const clock_minutes = Math.floor(timer / 60);
  const clock_remainingSeconds = (timer % 60).toFixed(0);
  const clockFormated = `${clock_minutes} minute(s) and ${clock_remainingSeconds} second(s)`;


  const Timer_minutes = Math.floor(timer / 60);
  const Timer_remainingSeconds = (timer % 60).toFixed(0);
  const TimerFormated = `${Timer_minutes} minute(s) and ${Timer_remainingSeconds} second(s)`;

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } 
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleFileSelect = (event) => {
    setTimer(0);
    setOutput('');
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0]; 
    const audio = new Audio(); 
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration); 
    }
  };

  const handleFileUpload = () => {
    setTimer(0 ); 
    setLoading(true);
    setIsRunning(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post('http://localhost:5000/my-endpoint', formData)
    //axios.post('https//https://text-recognition-ksz1.vercel.app/my-endpoint', formData)
      .then(response => {
        setOutput(response.data.data);
        console.log(response.data);
        setLoading(false);
        setfinaltime(timer);
        setIsRunning(false);
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
        Upload 
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      {loading ? <div className="spinner-container">
          <ClipLoader size={90} color="#123abc" loading={loading}/>
          <p><br></br>Duration :  {clockFormated} / {DurationFormated}</p>
        </div> : <div><p contentEditable={true}>{output}  </p> <br/>
        {timer != 0 ?     <p><br></br>The program took {TimerFormated} seconde to generate the text</p>: <p>The length of the audio is {DurationFormated}</p>}
       </div>}
      {}
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