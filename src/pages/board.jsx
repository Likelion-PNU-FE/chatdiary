import {getKoDayOfWeek} from "../utils/utils.js";
import calendarIcon from "../assets/calendar_sm_icn.svg";
import addIcon from "../assets/add_icn.svg";
import oops_gra from "../assets/oops_gra.svg";
import chat_icn from "../assets/chat_icn.svg";
import {useState} from "react"
import '../style/board.scss';
import Datepicker from "../components/datepicker.jsx";
import Bargraph from "../components/bargraph.jsx";

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

const userName = "감정아"; // 원하는 감정 이름으로 변경 가능

const Board = () => {
    let nowDate = new Date();
    const [selectedIndex, setSelectedIndex] = useState(6);

    // eslint-disable-next-line no-unused-vars
    const mockChatData = {
        title: "오늘의 대화",
        content: "친구와의 대화에서 여행 계획을 논의했습니다.",
        date: "2024-07-31",
        emotion: "화남",
        keywords1: "여행",
        keywords2: "친구",
        keywords3: "계획"
    };

    const [chatData] = useState(null); // 상태를 추가하여 서버 데이터를 저장

    const handleButtonClick = () => {
        alert('버튼 클릭!');
    };
    const convertDate = (date) => {
        //     7월 12일 일요일
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dayOfWeek = getKoDayOfWeek(date.getDay());
        return `${month}월 ${day}일 ${dayOfWeek}`;
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
                <div className="card mood-chart">
                    <p>7월 Mood Chart</p>
                    <Bargraph/>
                </div>
                <div className="card photo">
                    <button className="card add-photo" onClick={handleButtonClick}>
                        <img src={addIcon} alt="add" width="28px"/>
                    </button>
                    <p>
                        오늘의 <span className="highlight"> 사진</span>을 <br/>기록해보세요!
                    </p>

                </div>

                <div className="card chat-summary">
                    {chatData ? ( // chat 이 있을 경우인데 이거 미주 언니꺼 합치면 같이 쓰려고 구현 일단 생략입니당
                        <div className="summary-header">
                            <div className="summary-info">
                                <img src={chat_icn} alt="chat mood icon" className="chat-emotion"/>
                                <p>{chatData.title}</p>
                                <p>{chatData.date}</p>
                            </div>
                            <div className="summary-keyword">
                                <p>KEY WORD</p>
                                <div className="keyword-box">{chatData.keywords1}</div>
                                <div className="keyword-box">{chatData.keywords2}</div>
                                <div className="keyword-box">{chatData.keywords3}</div>
                            </div>
                        </div>
                    ) : ( // 데이터가 없을 경우
                        <div className="empty-summary">
                            <img src={oops_gra} alt="opps image"/>
                            <p>Oops! 기록할 대화가 없어요!</p>
                            <button className="chat-button" onClick={handleButtonClick}>
                                <img src={chat_icn} alt="chat icon" className="chat-icon"/>
                                <span>대화하러 가기</span>
                            </button>

                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Board;
