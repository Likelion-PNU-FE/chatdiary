import React, { useState } from 'react';
import Chat from './components/Chat';
import Popup from './components/Popup_emoji';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [emotion, setEmotion] = useState('happy'); // 예시로 'happy'를 기본값으로 설정

  const handleSave = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <button onClick={handleSave}>눌러보세용..</button>
      <Chat />
      {showPopup && <Popup main_emo={emotion} onClose={closePopup} />}
    </div>
  );
}

export default App;
