// AlarmSelector.jsx
import {useState} from 'react';
import alarmTone1 from './alarmTone1.mp3';
import alarmTone2 from './alarmTone2.mp3';
import alarmTone3 from './alarmTone3.mp3';

function AlarmSelector({ setSound }) {
  const [showOptions, setShowOptions] = useState(false);

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
