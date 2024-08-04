import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/Chat.scss';
import PopupSummary from '../components/PopupSummary';
import DiarySummaryView from '../components/DiarySummaryView';
import DiarySummaryEdit from '../components/DiarySummaryEdit';
import unicorn from '../assets/unicorn.svg';
import sendIcon from '../assets/send_icn.svg';

// AI 채팅 API에 메시지를 보내고 응답을 받아오는 함수
async function sendMessageToBackend(message) {
  const chatRoomId = "23"; // 실제 사용 중인 chatRoomId로 대체
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3RhdG8gand0IHNlcnZpY2UiLCJpc3MiOiJwb3RhdG8gc2VydmVyIiwianRpIjoiYWFAZXhhbXBsZS5jb20iLCJleHAiOjE3MjI4NDE3MTAsImVtYWlsIjoiYWFAZXhhbXBsZS5jb20ifQ.QMKHKFwahHTB9g7Db6hhQO-YtjBKL8dbeKsS4XPK-W4B-p4Y43eRwByCm1ekUw1L4qvhXGuXhEnn-cC4PHQH7Q";
  
  try {
    const response = await axios.post(
      `https://chat-diary.duckdns.org/api/chatRooms/${chatRoomId}/messages`,
      { prompt: message },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data.reply; // 백엔드에서 반환된 챗봇의 응답
  } catch (error) {
    console.error('오류가 발생했습니다:', error);
    return '유니콘과 연결하는데 문제가 발생했습니다.';
  }
}

// 랜덤 질문을 가져오는 함수
async function fetchRandomQuestion() {
  try {
    const response = await axios.get('http://3.37.103.251:8089/query/random');

    console.log('Random Question Response:', response.data); // 응답 데이터 확인

    if (response.data && response.data.query) {
      return response.data.query;
    } else {
      console.error('Expected query key not found in the response:', response.data);
      return '질문을 가져오는데 문제가 발생했습니다.';
    }
  } catch (error) {
    console.error('랜덤 질문 가져오기 오류:', error.message);
    return '질문을 가져오는데 문제가 발생했습니다.';
  }
}

// 일기를 저장하는 함수
async function saveDiary(chatRoomId, summary) {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3RhdG8gand0IHNlcnZpY2UiLCJpc3MiOiJwb3RhdG8gc2VydmVyIiwianRpIjoiYWFAZXhhbXBsZS5jb20iLCJleHAiOjE3MjI4NDE3MTAsImVtYWlsIjoiYWFAZXhhbXBsZS5jb20ifQ.QMKHKFwahHTB9g7Db6hhQO-YtjBKL8dbeKsS4XPK-W4B-p4Y43eRwByCm1ekUw1L4qvhXGuXhEnn-cC4PHQH7Q";
  try {
    const response = await axios.post(
      `https://chat-diary.duckdns.org/api/chatRooms/${chatRoomId}/diaries`,
      {
        title: summary.title,
        content: summary.content,
        emotion: summary.emotion,
        keyword1: summary.keywords[0] || '',
        keyword2: summary.keywords[1] || '',
        keyword3: summary.keywords[2] || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data; // 응답 데이터를 반환
  } catch (error) {
    console.error('일기 저장 중 오류가 발생했습니다:', error);
    throw error;
  }
}


//수정 api 호출
async function updateDiary(diaryId, summary) {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3RhdG8gand0IHNlcnZpY2UiLCJpc3MiOiJwb3RhdG8gc2VydmVyIiwianRpIjoiYWFAZXhhbXBsZS5jb20iLCJleHAiOjE3MjI4NDE3MTAsImVtYWlsIjoiYWFAZXhhbXBsZS5jb20ifQ.QMKHKFwahHTB9g7Db6hhQO-YtjBKL8dbeKsS4XPK-W4B-p4Y43eRwByCm1ekUw1L4qvhXGuXhEnn-cC4PHQH7Q"; // 실제 토큰으로 교체
  try {
    const response = await axios.put(
      `https://chat-diary.duckdns.org/api/diaries/${diaryId}`,
      {
        title: summary.title,
        content: summary.content,
        emotion: summary.emotion,
        keyword1: summary.keywords[0] || '',
        keyword2: summary.keywords[1] || '',
        keyword3: summary.keywords[2] || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data; // 수정된 응답 데이터를 반환
  } catch (error) {
    console.error('일기 수정 중 오류가 발생했습니다:', error);
    throw error;
  }
}


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [emotion, setEmotion] = useState('happy');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [content, setContent] = useState('');
  const chatContentRef = useRef(null);
  const inputRef = useRef(null);
  const [chatRoomId, setChatRoomId] = useState('23'); 

  useEffect(() => {
    // 페이지가 로드될 때 랜덤 질문을 가져옵니다.
    const getRandomQuestion = async () => {
      const randomQuestion = await fetchRandomQuestion();
      setMessages([{ prompt: randomQuestion, sender: 'bot' }]);
    };

    getRandomQuestion();

    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, []);

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessages([...messages, { prompt: inputText, sender: 'user' }]);
      setInputText('');
      inputRef.current.style.height = 'auto';

      try {
        const botReply = await sendMessageToBackend(inputText);
        setMessages((prevMessages) => [
          ...prevMessages,
          { prompt: botReply, sender: 'bot' },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { prompt: '유니콘과 연결하는데 문제가 발생했습니다.', sender: 'bot' },
        ]);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInputText(inputText + '\n');
    }
  };

  const handleSave = async () => {
    console.log("Save button clicked");
  
    const summary = { title, keywords, content, emotion };
    try {
      console.log("Saving diary...");
      const response = await saveDiary(chatRoomId, summary);
  
      console.log('백엔드 응답:', response);
      
      // 일기 생성 후 수정 API 호출
      const updatedSummary = {
        title: response.title || title,
        keywords: [response.keyword1, response.keyword2, response.keyword3].filter(Boolean),
        content: response.content || content,
        emotion: response.emotion || emotion,
      };
  
      await updateDiary(response.id, updatedSummary); // 수정 API 호출
  
      setEmotion(updatedSummary.emotion);
      setTitle(updatedSummary.title);
      setKeywords(updatedSummary.keywords);
      setContent(updatedSummary.content);
  
      setShowPopup(true);
    } catch (error) {
      console.error('일기 저장 중 오류가 발생했습니다:', error);
    }
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
            <span className="chat-date">2024년 8월 6일 월요일</span>
            <button className="save-button" onClick={handleSave}>SAVE</button>
          </div>
          <div className="chat-content" ref={chatContentRef}>
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.sender === 'bot' && <img src={unicorn} alt="unicorn" className="unicorn-icon" />}
                <div className={`chat-bubble ${message.sender}`}>
                  <p>{message.prompt}</p>
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
              <img src={sendIcon} alt="Send" />
            </button>
          </div>
          {showPopup && (
            <PopupSummary
              isVisible={showPopup}
              emotion={emotion} // 업데이트된 emotion 전달
              onClose={handleClosePopup}
              onSummary={handleShowSummary}
            />
          )}
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
