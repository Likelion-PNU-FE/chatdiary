import React, { useState } from 'react';
import Chat from './components/Chat';
import PopupSummary from './components/PopupSummary';
import DiarySummaryView from './components/DiarySummaryView';
import DiarySummaryEdit from './components/DiarySummaryEdit';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [emotion, setEmotion] = useState('happy');
  const [title, setTitle] = useState('GPT가 추천한 제목...');
  const [keywords, setKeywords] = useState(['조별과제', '잠수']);
  const [content, setContent] = useState('오늘 조별과제를 했는데 어떤놈이 잠수를 탔다. 자조사라는 놈이 잠수를 타버려서 매우 화가났다. 과제 제출 2일 전이라 그 놈의 분량까지 하룻동안 밤새워가며 했다. 처음에는 웃지 않은 친구 때문에 화가났고, 그 친구의 과제를 하며 체념을 했다고 이해하는 그냥 허탈했다. 다른 조원의 과제에 마무리 하고, 자조사라는 놈에게 맥주를 먹으며 마무리 지었다.');

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

  const handleEditShow = () => {
    setShowSummary(false);
    setShowEdit(true);
  };

  const handleEditClose = () => {
    setShowEdit(false);
    setShowSummary(true); // 다시 Summary로 돌아가기
  };

  const handleSaveEdit = (newTitle, newKeywords, newContent) => {
    setTitle(newTitle);
    setKeywords(newKeywords);
    setContent(newContent);
    setShowEdit(false);
    setShowSummary(true);
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  return (
    <div className="App">
      <Chat onSave={handleSave} />
      {showPopup && <PopupSummary emotion={emotion} onClose={handleSummaryShow} />}
      {showSummary && (
        <DiarySummaryView
          emotion={emotion}
          title={title}
          keywords={keywords}
          content={content}
          onEdit={handleEditShow}
          onClose={handleSummaryClose}
        />
      )}
      {showEdit && (
        <DiarySummaryEdit
          emotion={emotion}
          initialTitle={title}
          initialKeywords={keywords}
          initialContent={content}
          onSave={handleSaveEdit}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}

export default App;
