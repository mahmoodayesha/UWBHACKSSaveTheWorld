// AlarmSelector.jsx
import {useState} from 'react';


function AlarmSelector({ setSound }) {
  const [showOptions, setShowOptions] = useState(false);
  const alarmTone1 = '/alarmTone1.mp3';
  const alarmTone2 = '/alarmTone2.mp3';
  const alarmTone3 = '/alarmTone3.mp3';


  const sounds = [
    { name: 'Beep', file: alarmTone1 },
    { name: 'Birds', file: alarmTone2 },
    { name: 'Bell', file: alarmTone3 }
  ];

  const handleSelectSound = (soundFile) => {
    setSound(soundFile); // <-- Use the setSound function from props
    setShowOptions(false); // Hide options after selection
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setShowOptions(!showOptions)}>
        Choose Alarm Sound
      </button>

      {showOptions && (
        <div style={{ marginTop: '10px' }}>
          {sounds.map((sound, index) => (
            <div key={index}>
              <button className='buttons2' onClick={() => handleSelectSound(sound.file)}>
                {sound.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlarmSelector;
