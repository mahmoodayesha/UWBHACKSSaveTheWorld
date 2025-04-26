
import React, { useState, useEffect } from 'react';
import './App.css';
import heartRateVideo from './heartrate.mp4';

function App() {
  const baselineHR = 90;
  const dropThreshold = 0.09;
  const [heartRate, setHeartRate] = useState(baselineHR);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    const percentDrop = (baselineHR - heartRate) / baselineHR;
    if (percentDrop >= dropThreshold && !alerted) {
      setAlerted(true);
      alert('⚠️ Drowsiness Detected!');
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
      audio.play();
    }
    if (percentDrop < dropThreshold) {
      setAlerted(false);
    }
  }, [heartRate]);

  const handleHRChange = (delta) => {
    setHeartRate(prev => Math.max(30, prev + delta));
  };

  return (
    <div className="watch">
 
         <video autoPlay loop muted className="background-video">
        <source src={heartRateVideo} type="video/mp4" />
      </video>
      <div className="heart">❤️</div>
      <div className="hr-display">HR: {heartRate} BPM</div>
      <div className="buttons">
        <button onClick={() => handleHRChange(1)}>▲</button>
        <button onClick={() => handleHRChange(-1)}>▼</button>
      </div>
    </div>
  );
}

export default App;
