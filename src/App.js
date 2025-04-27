import React, { useState, useEffect } from "react";
import "./App.css";
import heartRateVideo from "./heartrate.mp4";
import AlarmSelector from "./AlarmSelector";
import alarmTone1 from './alarmTone1.mp3';

function App() {
  const baselineHR = 90;
  const dropThreshold = 0.1;
  const [heartRate, setHeartRate] = useState(baselineHR);
  const [alerted, setAlerted] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false); // state to control the alert
  const [isSimulating, setIsSimulating] = useState(false);
  const [inputHeartRate, setInputHeartRate] = useState(70); // To hold the user input

  useEffect(() => {
    const percentDrop = (baselineHR - heartRate) / baselineHR;
    if (percentDrop >= dropThreshold && !alerted) {
      setAlerted(true);
      if(selectedSound != null) // if there is a sound specifically selected by the user
      {
        const audio = new Audio(selectedSound);
        audio.play();
        setAlertVisible(true); // Show alert when drowsy driving is detected
        setTimeout(() => setAlertVisible(false), 5000); // Hide alert after 5 seconds
      }
      else{ // or the default tone
        const audio = new Audio(alarmTone1);
        audio.play();
        setAlertVisible(true); // Show alert when drowsy driving is detected
        setTimeout(() => setAlertVisible(false), 5000); // Hide alert after 5 seconds
      }
    }
    if (percentDrop < dropThreshold) {
      setAlerted(false);
    }
  }, [heartRate]);

  const handleHRChange = (delta) => {
    setHeartRate((prev) => Math.max(30, prev + delta));
  };

  // Function to simulate heart rate changes
  const startSimulation = () => {
    setIsSimulating(true);
    const interval = setInterval(() => {
      // Randomly increase or decrease the heart rate
      setHeartRate(prevRate => prevRate + (Math.random() > 0.5 ? 0 : -1));
    }, 500); // every second
    
    // Stop the simulation after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 10000); // 10 seconds
  };

  const handleInputChange = (event) => {
    // Update the heart rate input value
    setInputHeartRate(parseInt(event.target.value));
  };

  const handleSubmitHeartRate = (event) => {
    // event.preventDefault();
    // Set the heart rate to the input value when the user submits
    setHeartRate(parseInt(inputHeartRate));
  };

  const handleButtonClick = () => {
    handleSubmitHeartRate();  // Submit the heart rate input
    startSimulation();        // Start the simulation
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
        <AlarmSelector setSound={setSelectedSound}/>
      </div>
        {/* Alert message */}
        {alertVisible && (
        <div style={{
          position: 'fixed', 
          top: '130px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          fontSize: '35px'
        }}>
          Drowsy Driving Detected!
        </div>
      )}
      <div style={{ marginTop: '-300px', marginLeft: '140px' }}>
      <div style={{ padding: '20px' }}>
      {/* Input for heart rate */}
      <div>
      <label htmlFor="heartRateInput" style={{ fontSize: '20px' }}>Enter Resting Heart Rate:</label>
        <input
          id="heartRateInput"
          type="number"
          value={inputHeartRate}
          onChange={handleInputChange}
          min="40" // Set minimum limit for heart rate
          max="200" // Set maximum limit for heart rate
          disabled={isSimulating} // Disable input while simulating
        />
      </div>

      {/* Button to start simulation */}
      <button
        className="buttons3"
        onClick={ handleButtonClick}
        disabled={isSimulating}
      >
        Start Simulation
      </button>
      
      {isSimulating && <p>Simulation is running...</p>}
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
