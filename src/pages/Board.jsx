import {getImagePathByEmotion, getKoDayOfWeek} from "../utils/utils.js";
import calendarIcon from "../assets/calendar_sm_icn.svg";
import deleteIcon from "../assets/deleteIcn.svg"
import addIcon from "../assets/add_icn.svg";
import oopsGra from "../assets/oops_gra.svg";
import chatIcon from "../assets/chat_icn.svg";
import anxiousImg from "../assets/anxious.svg";
import sosoImg from "../assets/soso.svg";
import strengthImg from "../assets/strength.svg";
import joyImg from "../assets/joy.svg";
import happyImg from "../assets/happy.svg";
import angryImg from "../assets/angry.svg";
import embarImg from "../assets/embar.svg";
import sadImg from "../assets/sad.svg";
import {useEffect, useState} from "react";
import './Board.scss';
import '../components/Bargraph.scss'
import Datepicker from "../components/datepicker.jsx";
import Bargraph from "../components/Bargraph.jsx";
import BargraphPopup from "../components/MoodChart.jsx";
import useFetchData from "../hook/useFetchData.js";
import {getMyInfo, getDiaryContent,getMonthEmotions} from "../services/apis.js";

const imagePaths = {
    anxiousImg,
    sosoImg,
    strengthImg,
    joyImg,
    happyImg,
    angryImg,
    embarImg,
    sadImg
};

const days = [
    { day: 'Mon', date: 3, emotion: 'HAPPY' },
    { day: 'Tue', date: 4, emotion: 'SAD' },
    { day: 'Wed', date: 5, emotion: 'ANXIOUS' },
    { day: 'Thu', date: 6, emotion: 'HAPPY' },
    { day: 'Fri', date: 7, emotion: 'TIRED' },
    { day: 'Sat', date: 8, emotion: 'ANGRY' },
    { day: 'Sun', date: 9, emotion: 'EMBARRASSED' },
    { day: 'Mon', date: 10, emotion: 'NEUTRAL' },
    { day: 'Tue', date: 11, emotion: 'EXCITED' },
    { day: 'Wed', date: 12, emotion: 'HAPPY' },
    { day: 'Sat', date: 13, emotion: '' },
    { day: 'Sun', date: 14, emotion: '' },
    { day: 'Mon', date: 15, emotion: '' },
    { day: 'Tue', date: 16, emotion: '' },
    { day: 'Wed', date: 17, emotion: '' },
];

const Board = () => {
    let nowDate = new Date();
    const {data: userData} = useFetchData(getMyInfo);
    const [selectedIndex, setSelectedIndex] = useState(6);
    const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 상태 추가
    const [photo, setPhoto] = useState(null);
    const { data: diaryContent } = useFetchData(() => getDiaryContent({ targetDate: "2024-08-09" }));
    const { data: apiData = [] } = useFetchData(() => {
        return getMonthEmotions("2024-08");
    });

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

    const handleGoChatClick = () => {
        alert("채팅으로 이동");
    }

    const handleEditButtonClick = () => {
        alert("수정으로 이동");
    };

    return (
        <div className="board">
            <header>
              <h3>반가워, <strong>{userData?.name.toString() || ""}</strong>! 👋</h3>
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
                    <p>{nowDate.getMonth()+1}월 Mood Chart</p>
                    <Bargraph version={1} apiData ={apiData}/>
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
                    {diaryContent ? (
                        <div className="summary-content">
                            <div className="header-top">
                                <img src={imagePaths[getImagePathByEmotion(diaryContent.emotion)]} alt="chat mood icon" className="chat-emotion" width="60px" />
                                <div className="header-text">
                                    <div className="header-text-top">
                                        {diaryContent.title}
                                        <div className="buttons">
                                        <button className="edit-button" onClick={handleEditButtonClick}>Edit</button>
                                        <img src={deleteIcon} alt="deleteIcn" width="20px" color="0xFFFFF"/>
                                        </div>
                                    </div>
                                    <p>{diaryContent.date}</p>
                                    <div className="keywords">
                                        <span className="keyword-title">KeyWord</span>
                                        <span className="keyword">{diaryContent.keyword1}</span>
                                        <span className="keyword">{diaryContent.keyword2}</span>
                                        <span className="keyword">{diaryContent.keyword3}</span>
                                    </div>
                                </div>
                                {/*<button className="edit-button" onClick={handleEditButtonClick}>Edit</button>*/}
                            </div>
                            <hr className="divider"/>
                            <div className="summary-body">
                                <h4>내용</h4>
                                <p>{diaryContent.content}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-summary">
                            <img src={oopsGra} alt="opps image"/>
                            <p>Oops! 기록할 대화가 없어요!</p>
                            <button className="chat-button" onClick={handleGoChatClick}>
                                <img src={chatIcon} alt="chat icon" className="chat-icon"/>
                                <span>대화하러 가기</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

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
