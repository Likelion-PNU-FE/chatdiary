import {getImagePathByEmotion, getKoDayOfWeek} from "../utils/utils.js";
import calendarIcon from "../assets/calendar_sm_icn.svg";
import addIcon from "../assets/add_icn.svg";
import oops_gra from "../assets/oops_gra.svg";
import chat_icn from "../assets/chat_icn.svg";
import {useState} from "react";
import './board.scss';
import '../components/Bargraph.scss'
import Datepicker from "../components/datepicker.jsx";
import Bargraph from "../components/bargraph.jsx";
import BargraphPopup from "../components/MoodChart.jsx";

const days = [
    {day: 'Mon', date: 3, emoji: '😍'},
    {day: 'Tue', date: 4, emoji: '😍'},
    {day: 'Wed', date: 5, emoji: '😍'},
    {day: 'Thu', date: 6, emoji: '😍'},
    {day: 'Fri', date: 7, emoji: '😍'},
    {day: 'Sun', date: 8, emoji: '😍'},
    {day: 'Mon', date: 9, emoji: '😍'},
    {day: 'Tue', date: 10, emoji: '😍'},
    {day: 'Wed', date: 11, emoji: '😍'},
    {day: 'Thu', date: 12, emoji: '😡'},
    {day: 'Fri', date: 13, emoji: ''},
    {day: 'Sat', date: 14, emoji: ''},
    {day: 'Sun', date: 15, emoji: ''},
    {day: 'Mon', date: 16, emoji: ''},
    // 필요한 만큼 날짜를 추가합니다.
];

const userName = "감정아";

// eslint-disable-next-line no-unused-vars
const mockChatData = {
    title: "오늘의 대화",
    content: "친구와의 대화에서 여행 계획을 논의했습니다.",
    date: "2024-07-31",
    emotion: getImagePathByEmotion("화남"),
    keywords1: "여행",
    keywords2: "친구",
    keywords3: "계획"
};

const Board = () => {
    let nowDate = new Date();
    const [selectedIndex, setSelectedIndex] = useState(6);
    const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 상태 추가
    const [photo, setPhoto] = useState(null);
    const [chatData] = useState(mockChatData); //mockChatData

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
            // 서버로 사진을 보내는 로직 (주석 처리)
            // const formData = new FormData();
            // formData.append('photo', file);
            // fetch('YOUR_API_ENDPOINT', {
            //     method: 'POST',
            //     body: formData,
            // }).then(response => {
            //     // 서버 응답 처리
            // });
        }
    };

    const handleGoChatClick = () => {
        alert("채팅으로 이동");
    }

    return (
        <div className="board">
            <header>
                <h3>반가워, <strong>{userName}</strong>! 👋</h3>
                <button className="date-picker-button">
                    <p>{convertDate(nowDate)}</p>
                    <img src={calendarIcon} alt="calendar" width="20px"/>
                </button>
            </header>
            <nav>
                <Datepicker days={days} nowIndex={selectedIndex} setIndex={setSelectedIndex}/>
            </nav>
            <section>
                <div className="card mood-chart" onClick={handleMoodChartClick}>
                    <p>7월 Mood Chart</p>
                    <Bargraph/>
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
                    {chatData ? (
                        <div className="summary-header">
                            <div className="header-top">
                                <img src={chatData.emotion} alt="chat mood icon" className="chat-emotion"
                                     width="50px"/>
                                <div className="header-text">
                                    <h3>
                                        {chatData.title}
                                    </h3>
                                    <p>{chatData.date}</p>
                                    <div className="keywords">
                                        <span className="keyword-title">KeyWord</span>
                                        <span className="keyword">{chatData.keywords1}</span>
                                        <span className="keyword">{chatData.keywords2}</span>
                                        <span className="keyword">{chatData.keywords3}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="divider"/>
                            <div className="summary-body">
                                <h4>내용</h4>
                                <p>{chatData.content}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-summary">
                            <img src={oops_gra} alt="opps image"/>
                            <p>Oops! 기록할 대화가 없어요!</p>
                            <button className="chat-button" onClick={handleGoChatClick}>
                                <img src={chat_icn} alt="chat icon" className="chat-icon"/>
                                <span>대화하러 가기</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <BargraphPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopup}
                // 사용자가 선택한 날짜의 월 받아서 넘겨야함
                month={nowDate.getMonth() + 1}
            />
        </div>
    );
}

export default Board;
