import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postChatRoom, getDiaryContent, deleteDiary, getMyInfo } from '../services/apis'; // 필요한 API 불러오기
import '../styles/Chat.scss';
import PopupSummary from '../components/PopupSummary';
import DiarySummaryView from '../components/DiarySummaryView';
import DiarySummaryEdit from '../components/DiarySummaryEdit';
import unicorn from '../assets/unicorn.svg';
import sendIcon from '../assets/send_icn.svg';

function ChatPage() {
  const navigate = useNavigate();
  const { locate } = useLocation();
  const { date, id: chatRoomId } = locate || {};  // 여기서 date를 받아옴
  const [isSaved, setIsSaved] = useState(false);
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

  useEffect(() => {
    if (!chatRoomId) {
      navigate('/board'); // chatRoomId가 없으면 board 페이지로 리다이렉트
      return;
    }

    // 사용자 정보 가져오기
    async function fetchUserInfo() {
      try {
        const userInfo = await getMyInfo();
        console.log('사용자 정보:', userInfo.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
        navigate('/login'); // 로그인 오류 시 로그인 페이지로 리다이렉트
      }
    }

    // 특정 날짜의 일기 내용 불러오기
    async function fetchDiaryContent() {
      try {
        const diaryContent = await getDiaryContent(date);  // 전달받은 date를 사용
        if (diaryContent.data) {
          setTitle(diaryContent.data.title || '');
          setKeywords([
            diaryContent.data.keyword1 || '',
            diaryContent.data.keyword2 || '',
            diaryContent.data.keyword3 || ''
          ]);
          setContent(diaryContent.data.content || '');
          setEmotion(diaryContent.data.emotion || 'happy');
        }
      } catch (error) {
        console.error('일기 내용을 가져오는 중 오류가 발생했습니다:', error);
      }
    }

    fetchUserInfo();
    fetchDiaryContent();

    setMessages([
      { prompt: '오늘 하루에 있었던 일을 말해주시면 하루를 요약해 일기를 적어드릴게요.', sender: 'bot' },
    ]);

    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatRoomId, date, navigate]);

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessages([...messages, { prompt: inputText, sender: 'user' }]);
      setInputText('');
      inputRef.current.style.height = 'auto';

      try {
        const botReply = '유니콘과 연결 중입니다...'; // 실제 API 요청을 위한 자리표시자
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

  const handleSave = async () => {
    // Save 버튼 클릭 시 처리
    setIsSaved(true);
    setShowPopup(true);
  };

  const handleBackClick = async () => {
    // 메시지 배열에 사용자 메시지가 있는지 확인 (index 1부터는 사용자 메시지가 있을 가능성이 큼)
    const hasUserMessage = messages.some((msg, index) => index > 0 && msg.sender === 'user');

    if (!isSaved && chatRoomId && !hasUserMessage) {
      try {
        await deleteDiary(chatRoomId); // 저장되지 않은 경우 채팅방 삭제
      } catch (error) {
        console.error('채팅방 삭제 중 오류가 발생했습니다:', error);
      }
    }
    navigate('/board');
  };


  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음';
  
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return '날짜 오류';
  
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
  
    // 요일을 구하기 위해 추가
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekDays[dateObj.getDay()];
  
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
  };

  return (
    <div className="chat-container">
      {!showSummary && !showEdit ? (
        <>
          <div className="chat-header">
            <button className="back-button" onClick={handleBackClick}>&lt;</button>
            <span className="chat-date">{formatDate(date)}</span>  {/* 전달받은 date를 표시 */}
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
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
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
              emotion={emotion}
              onClose={() => setShowPopup(false)}
              onSummary={() => setShowSummary(true)}
            />
          )}
        </>
      ) : showSummary ? (
        <DiarySummaryView
          emotion={emotion}
          title={title}
          keywords={keywords}
          content={content}
          onEdit={() => setShowEdit(true)}
          onClose={() => setShowSummary(false)}
        />
      ) : (
        <DiarySummaryEdit
          emotion={emotion}
          initialTitle={title}
          initialKeywords={keywords}
          initialContent={content}
          onSave={(newTitle, newKeywords, newContent) => {
            setTitle(newTitle);
            setKeywords(newKeywords);
            setContent(newContent);
            setShowEdit(false);
            setShowSummary(true);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}

export default ChatPage;
