import {getKoDayOfWeek} from "../utils/utils.js";
import calendarIcon from "../assets/calendar_sm_icn.svg";
import {useState} from "react";
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


const Board = () => {
    let nowDate = new Date();
    const [selectedIndex, setSelectedIndex] = useState(6);

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
                <h3>반가워, 감정아! 👋</h3>
                <button>
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
                <div className="card">
                    hihi
                </div>
                <div className="card chat-summary">
                    hihi
                </div>
            </section>
        </div>
    );
}

export default Board;
