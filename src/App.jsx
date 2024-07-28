import React, { useState } from 'react';
import Chat from './components/Chat';
import PopupSummary from './components/PopupSummary';
import DiarySummary from './components/DiarySummary';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [emotion, setEmotion] = useState('happy'); // 기본 감정 값 예시

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSummaryShow = () => {
    setShowPopup(false);
    setShowSummary(true);
  };

  const handleSummaryClose = () => {
    setShowSummary(false);
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  return (
    <div className="App">
      <Chat onSave={handleSave} />
      {showPopup && <PopupSummary emotion={emotion} onClose={handleSummaryShow} />}
      {showSummary && <DiarySummary emotion={emotion} onClose={handleSummaryClose} />}
    </div>
  );
}

export default App;
