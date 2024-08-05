import {useEffect, useRef, useState} from 'react';
import '../styles/Chat.css';
import PopupSummary from '../components/PopupSummary';
import DiarySummaryView from '../components/DiarySummaryView';
import DiarySummaryEdit from '../components/DiarySummaryEdit';
import unicorn from '../assets/unicorn.svg';
import sendIcon from '../assets/send_icn.svg';
import {useLocation} from "react-router-dom";

function ChatPage() {

  const {state} = useLocation();
  const {date, id} = state;
  
  const [messages, setMessages] = useState([
    {text: '안녕, 나의 오늘 하루를 말해도 될까 ?', sender: 'user'},
    {text: '네, 오늘 하루에 있었던 일을 말해주시면 하루를 요약해 일기를 적어드릴게요.', sender: 'bot'},
    {text: '오늘 조별과제를 했는데 팀원이 안왔어.', sender: 'user'},
    {
      text: '짜증나는 일이네요. 또 다른 일은 없었나요? 오늘 먹은 것이나 본 것 다 괜찮아요! 혹시 이 얘기가 끝났다면 오른쪽 하단에 저랑 버튼을 누르면 제가 일기를 만들어 드릴게요 !',
      sender: 'bot'
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [emotion, setEmotion] = useState('happy');
  const [title, setTitle] = useState('GPT가 추천한 제목...');
  const [keywords, setKeywords] = useState(['조별과제', '잠수']);
  const [content, setContent] = useState('오늘 조별과제를 했는데 어떤놈이 잠수를 탔다. 자조사라는 놈이 잠수를 타버려서 매우 화가났다. 과제 제출 2일 전이라 그 놈의 분량까지 하룻동안 밤새워가며 했다. 처음에는 웃지 않은 친구 때문에 화가났고, 그 친구의 과제를 하며 체념을 했다고 이해하는 그냥 허탈했다. 다른 조원의 과제에 마무리 하고, 자조사라는 놈에게 맥주를 먹으며 마무리 지었다.');

  const chatContentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, {text: inputText, sender: 'user'}]);
      setInputText('');
      inputRef.current.style.height = 'auto';
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {text: '백엔드에서 가져온 유니콘의 응답', sender: 'bot'},
        ]);
      }, 1000); // 1초 후에 유니콘의 응답을 추가
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInputText(inputText + '\n');
    }
  };

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowSummary = () => {
    setShowPopup(false);
    setShowSummary(true);
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

  return (
    <div className="chat-container">
      {!showSummary && !showEdit ? (
        <>
          <div className="chat-header">
            <button className="back-button">&lt;</button>
            <span className="chat-date">7월 15일 일요일</span>
            <button className="save-button" onClick={handleSave}>SAVE</button>
          </div>
          <div className="chat-content" ref={chatContentRef}>
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.sender === 'bot' && <img src={unicorn} alt="unicorn" className="unicorn-icon"/>}
                <div className={`chat-bubble ${message.sender}`}>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <textarea
              type="text"
              placeholder="오늘 있었던 일을 unicorn에게 말해주세요"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="chat-input"
              ref={inputRef}
              rows={1}
            />
            <button className="send-button" onClick={handleSend}>
              <img src={sendIcon} alt="Send"/>
            </button>
          </div>
          {showPopup && <PopupSummary isVisible={showPopup} emotion={emotion} onClose={handleClosePopup}
                                      onSummary={handleShowSummary}/>}
        </>
      ) : showSummary ? (
        <DiarySummaryView
          emotion={emotion}
          title={title}
          keywords={keywords}
          content={content}
          onEdit={handleEditShow}
          onClose={() => setShowSummary(false)}
        />
      ) : (
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

export default ChatPage;
