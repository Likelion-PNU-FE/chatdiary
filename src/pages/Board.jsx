import {getDateString, getKoDayOfWeek} from "../utils/utils.js";
import calendarIcon from "../assets/calendar_sm_icn.svg";
import addIcon from "../assets/add_icn.svg";
import {useEffect, useState} from "react";
import './Board.scss';
import '../components/Bargraph.scss'
import Datepicker from "../components/datepicker.jsx";
import Bargraph from "../components/Bargraph.jsx";
import BargraphPopup from "../components/MoodChart.jsx";
import useFetchData from "../hook/useFetchData.js";
import {deleteDiary, getDiaryContent, getMonthEmotions, getMyInfo, postChatRoom} from "../services/apis.js";
import LogoutDialog from "../components/LogoutDialog.jsx";
import CalendarPopup from "../components/CalendarPopup.jsx";
import {useNavigate} from "react-router-dom";
import ChatSummary from "../components/ChatSummary.jsx";


const Board = () => {
  const initializeDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정
    return date;
  };
  let [nowDate, setNowDate] = useState(initializeDate());
  const {data: userData} = useFetchData(getMyInfo);
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 상태 추가
  const [photo, setPhoto] = useState(null);
  const {data: diaryContent, error: diaryError} = useFetchData(getDiaryContent, getDateString(nowDate));
  const {data: apiData = []} = useFetchData(getMonthEmotions, "2024-08")
  const navigate = useNavigate();

  useEffect(() => {
    if (apiData) {
      console.log("요약 데이터 : ", apiData);
    } else {
      console.log("apiData가 아직 없음");
    }
  }, [apiData]);

  // 날짜 선택
  const convertDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dayOfWeek = getKoDayOfWeek(date.getDay());
    return `${month}월 ${day}일 ${dayOfWeek}`;
  };

  // 무드 차트 팝업
  const handleMoodChartClick = () => {
    setPopupVisible(true); // 팝업 보이기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 닫기
  };

  // 사진 추가
  const handleAddButtonClick = () => {
    document.getElementById("photo-input").click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // 사진 미리보기
      };
      reader.readAsDataURL(file);
    }
  };


  const handleGoChatClick = async () => {
    try {
      if (diaryError?.response?.status !== 409) return alert("대화방 생성 실패 : 이미 생성된 대화방이 있습니다. 새로고침 해주세요");
      const date = getDateString(nowDate);
      const response = await postChatRoom({title: "오늘의 대화", date});
      const id = response.data?.chatRoomId;

      if (!id) throw new Error("id 없음");
      navigate('/chat', {state: {date: nowDate, id}});
    } catch (e) {
      alert(`대화방 생성 실패 : ${e}`);
    }
  }

  const handleEditButtonClick = () => {
    // diaryContent에는 현재 선택된 날짜에 해당하는 일기 데이터가 포함되어 있어야 합니다.
    if (!diaryContent) {
      alert("수정할 일기 데이터가 없습니다.");
      return;
    }
  
    const { title, content, emotion, diaryId } = diaryContent; // diaryContent에서 필요한 데이터 추출
    navigate('/edit', { 
      state: { 
        title, 
        content, 
        emotion, 
        diaryId, 
        date: getDateString(nowDate) // 현재 선택된 날짜를 전달
      }
    });
  };

  const handleDeleteDiary = async (diaryId) => {
    try {
      await deleteDiary(diaryId);
      alert("일기가 성공적으로 삭제되었습니다."); // 삭제 후 알림 추가
      window.location.reload(); // 페이지 새로 고침
    } catch (error) {
      console.error("일기 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="board">
      <header>
        <h3>반가워, <strong onClick={() => setLogoutOpen(true)}>{userData?.name.toString() || ""}</strong>! 👋</h3>
        <button className="date-picker-button" onClick={() => setCalendarOpen(true)}>
          <p>{convertDate(nowDate)}</p>
          <img src={calendarIcon} alt="calendar" width="20px"/>
        </button>
      </header>
      <nav>
        <Datepicker nowDate={nowDate} setNowDate={setNowDate}/>
      </nav>
      <section>
        <div className="card mood-chart" onClick={handleMoodChartClick}>
          <p>{nowDate.getMonth() + 1}월 Mood Chart</p>
          <Bargraph version={1} apiData={apiData}/>
        </div>
        <div className="card photo">
          {photo ? (
            <img src={photo} alt="Uploaded" className="uploaded-photo"
                 style={{width: "100%", height: "auto"}}/>
          ) : (
            <button className="card add-photo" onClick={handleAddButtonClick}>
              <img src={addIcon} alt="add" width="28px"/>
            </button>
          )}
          <input
            type="file"
            id="photo-input"
            accept="image/*"
            style={{display: 'none'}} // input 숨김
            onChange={handlePhotoChange}
          />
          <p>
            오늘의 <span className="highlight"> 사진</span>을 <br/>기록해보세요!
          </p>
        </div>

        <div className="card chat-summary">
          <ChatSummary diaryContent={diaryContent} diaryError={diaryError}
                       goChat={handleGoChatClick} goDelete={handleDeleteDiary}/>
        </div>
      </section>

      <LogoutDialog isOpen={isLogoutOpen} setOpen={setLogoutOpen} user={userData}/>
      <CalendarPopup isVisible={isCalendarOpen} setVisible={setCalendarOpen} nowDate={nowDate}
                     setNowDate={setNowDate}/>
      <BargraphPopup
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        month={nowDate.getMonth() + 1}
        apiData={apiData}
      />
    </div>
  );
}

export default Board;
