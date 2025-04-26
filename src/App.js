import React, { useState, useEffect } from "react";
import "./App.css";
import heartRateVideo from "./heartrate.mp4";

function App() {
  const baselineHR = 90;
  const dropThreshold = 0.1;
  const [heartRate, setHeartRate] = useState(baselineHR);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    const percentDrop = (baselineHR - heartRate) / baselineHR;
    if (percentDrop >= dropThreshold && !alerted) {
      setAlerted(true);
      alert("⚠️ Drowsiness Detected!");
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      audio.play();
    }
    if (percentDrop < dropThreshold) {
      setAlerted(false);
    }
  }, [heartRate]);

  const handleHRChange = (delta) => {
    setHeartRate((prev) => Math.max(30, prev + delta));
  };

  return (
    <>
      <div className="title">Safe Driving Buddy🚘💂</div>

      <div className="watch">
        <div className="video-container">
          <video autoPlay loop muted className="background-video">
            <source src={heartRateVideo} type="video/mp4" />
          </video>
        </div>
        <div className="heart">❤️</div>
        <div className="hr-display">
          HR: {heartRate} <span className="bpm-display">BPM</span>
        </div>

        <div className="buttons">
          <button onClick={() => handleHRChange(1)}>▲</button>
          <button onClick={() => handleHRChange(-1)}>▼</button>
        </div>
      </div>
      <div className="info-section">
        <p>
          <strong>Safe Driving Buddy</strong> is an app designed to help prevent
          drowsy driving by monitoring your heart rate through a smartwatch.
          Research shows that a drop of around 10% in your heart rate can
          indicate drowsiness or microsleep, which can be dangerous while
          driving. The working demo on this website showcases how the app works
          by simulating a smartwatch display. In the demo, the user's average
          resting heart rate is set to 90. If the heart rate drops by 10% or
          more, the system triggers an alert. You can interact with the demo by
          adjusting the heart rate, and when it decreases below the set
          threshold, the alert system activates, simulating how the app would
          function in a real-world driving scenario. This demonstration shows
          how the app monitors heart rate in real-time and sends an alert to
          warn the driver about potential drowsiness, helping to prevent
          fatigue-related accidents.
    <br />
    <br />
    <small style={{ color: 'red' }}>
      *Source: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6393761/#:~:text=The%20mean%20HR%20while%20driving,by%20Wilcoxon%20singed%20rank%20test" target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Research on Heart Rate and Drowsiness Detection</a>
    </small>
  </p>
</div>
    </>
  );
}

export default App;
