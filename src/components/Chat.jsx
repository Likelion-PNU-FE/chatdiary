import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css';
import unicorn from '../assets/unicorn.svg';
import sendIcon from '../assets/send_icn.svg';

function Chat({ onSave }) {
  const [messages, setMessages] = useState([
    { text: '안녕, 나의 오늘 하루를 말해도 될까 ?', sender: 'user' },
    { text: '네, 오늘 하루에 있었던 일을 말해주시면 하루를 요약해 일기를 적어드릴게요.', sender: 'bot' },
    { text: '오늘 조별과제를 했는데 팀원이 안왔어.', sender: 'user' },
    { text: '짜증나는 일이네요. 또 다른 일은 없었나요? 오늘 먹은 것이나 본 것 다 괜찮아요! 혹시 이 얘기가 끝났다면 오른쪽 하단에 저랑 버튼을 누르면 제가 일기를 만들어 드릴게요 !', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const chatContentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
      inputRef.current.style.height = 'auto';
      // 여기서 백엔드 호출을 통해 유니콘의 응답을 가져올 수 있습니다.
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '백엔드에서 가져온 유니콘의 응답', sender: 'bot' },
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

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button">&lt;</button>
        <span className="chat-date">7월 15일 일요일</span>
        <button className="save-button" onClick={onSave}>SAVE</button>
      </div>
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.sender === 'bot' && <img src={unicorn} alt="unicorn" className="unicorn-icon" />}
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
        <button className="send-button" onClick={onSave}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default Chat;