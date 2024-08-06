import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDiary, getDiaryContent, getMyInfo } from '../services/apis'; // 필요한 API 불러오기
import '../styles/Chat.scss';
import { Api } from '../services/index.js';
import PopupSummary from '../components/PopupSummary';
import DiarySummaryView from '../components/DiarySummaryView';
import DiarySummaryEdit from '../components/DiarySummaryEdit';
import unicorn from '../assets/unicorn.svg';
import sendIcon from '../assets/send_icn.svg';

function ChatPage() {
  const navigate = useNavigate();
  const locate = useLocation();
  const { date, id: chatRoomId } = locate?.state || {};  // 여기서 date를 받아옴
  console.log('locate:', date, chatRoomId);
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
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();  // 기본 동작(줄 바꿈)을 방지합니다.
      handleSend();  // 메시지 전송을 한 번만 호출합니다.
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      // 사용자의 입력 메시지를 먼저 추가
      setMessages(prevMessages => [...prevMessages, { prompt: inputText, sender: 'user' }]);
  
      const currentInput = inputText;  // 현재 입력 텍스트를 별도로 저장
      setInputText('');  // 입력 필드 초기화
      inputRef.current.style.height = 'auto';
  
      try {
        const response = await Api.post(`/chatRooms/${chatRoomId}/messages`, {
          prompt: currentInput,  // 저장한 입력 텍스트 사용
        });
  
        // 챗봇 응답을 메시지로 추가
        setMessages(prevMessages => [
          ...prevMessages,
          { prompt: response.data.reply, sender: 'bot' },  // 백엔드의 챗봇 응답 사용
        ]);
      } catch (error) {
        console.error('오류가 발생했습니다:', error);
        setMessages(prevMessages => [
          ...prevMessages,
          { prompt: '유니콘과 연결하는데 문제가 발생했습니다.', sender: 'bot' },
        ]);
      }
  
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;  // 채팅창을 최신 메시지로 스크롤
      }
    }
  };

  const handleSave = async () => {
    try {
      // 일기 생성 API 호출
      const response = await Api.post(`/chatRooms/${chatRoomId}/diaries`, {
        // 필요한 데이터는 백엔드 API 스펙에 맞게 전달
        // 예시: 이 부분에 전달할 필요한 데이터가 있다면 추가하세요
      });

      // 일기 생성이 성공하면 응답 데이터를 사용하여 팝업에 전달할 상태 업데이트
      const createdDiary = response.data; // 백엔드에서 반환된 일기 데이터

      // 일기 정보를 상태에 저장하여 `DiarySummaryView`로 전달
      setTitle(createdDiary.title || '');
      setKeywords([
        createdDiary.keyword1 || '',
        createdDiary.keyword2 || '',
        createdDiary.keyword3 || ''
      ]);
      setContent(createdDiary.content || '');
      setEmotion(createdDiary.emotion || 'HAPPY'); // 기본 감정값 설정 (예: HAPPY)

      // 팝업 표시
      setIsSaved(true);
      setShowSummary(true); // DiarySummaryView를 표시하기 위해 상태 변경
    } catch (error) {
      console.error('일기 생성 중 오류가 발생했습니다:', error);
      // 오류 처리 로직을 추가하세요 (예: 사용자에게 오류 메시지를 표시)
    }
  };
  const handleSaveAndClose = async () => {
    try {
      const response = await Api.post(`/chatRooms/${chatRoomId}/diaries`, {});
      const createdDiary = response.data;

      setTitle(createdDiary.title || '');
      setKeywords([
        createdDiary.keyword1 || '',
        createdDiary.keyword2 || '',
        createdDiary.keyword3 || ''
      ]);
      setContent(createdDiary.content || '');
      setEmotion(createdDiary.emotion || 'HAPPY');
      setIsSaved(true);

      navigate('/board'); // board로 이동
    } catch (error) {
      console.error('일기 저장 중 오류가 발생했습니다:', error);
    }
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

  const handleEdit = () => {
    setShowEdit(true);
    setShowSummary(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음';
  
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return '날짜 오류';
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  
  return (
    <div className="chat-container">
      {!showSummary && !showEdit ? (
        <>
          <div className="chat-header">
            <button className="back-button" onClick={handleBackClick}>&lt;</button>
            <span className="chat-date">{formatDate(date)}</span> {/* 전달받은 date를 표시 */}
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
            onKeyDown={handleKeyDown}  // 여기서 handleKeyDown 함수를 호출합니다.
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
          onEdit={handleEdit}
          onClose={() => setShowSummary(false)}
          onSaveAndClose={handleSaveAndClose}
        />
      ) : (
        <DiarySummaryEdit
  diaryId={chatRoomId}  // diaryId로 전달
  date={formatDate(date)}  // 수정할 일기의 날짜를 전달
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
