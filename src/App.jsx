import React, { useState } from 'react';
import Chat from './components/Chat';
import PopupSummary from './components/PopupSummary';
import './App.css';

function App() {
    const [showSummaryPopup, setShowSummaryPopup] = useState(false);
    const [emotion, setEmotion] = useState('happy'); // 예시로 'happy' 설정

    const handleSave = () => {
        setShowSummaryPopup(true);
    };

    const closeSummaryPopup = () => {
        setShowSummaryPopup(false);
    };

    return (
        <div className='App'>
            <Chat onSave={handleSave} />
            {showSummaryPopup && <PopupSummary emotion={emotion} onClose={closeSummaryPopup} />}
        </div>
    );
}

export default App;
