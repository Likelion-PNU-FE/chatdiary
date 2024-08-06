import {useEffect, useRef, useState} from "react";
import {getDateString, getImagePathByEmotion, getUsDayOfWeek} from "../utils/utils.js";
import {getDiaryRecentEmotion} from "../services/apis.js";

const Datepicker = ({nowDate, setNowDate}) => {
  const containerRef = useRef(null);
  const [dates, setDates] = useState([]);
  const [emotions, setEmotions] = useState({})//key값은  날짜, value값은 감정
  // componentDidMount

  useEffect(() => {
    //   nowdate +- 7일
    makeDate();
    getEmotions();
  }, [nowDate]);

  useEffect(() => {
    const nowIndex = dates.findIndex((date) => getDateString(date) === getDateString(nowDate));
    if (nowIndex < 0) return;
    const container = containerRef.current;
    const selectedElement = container.children[nowIndex];
    if (!selectedElement) return;
    const containerWidth = container.offsetWidth;
    const selectedElementWidth = selectedElement.offsetWidth;
    const scrollLeft = selectedElement.offsetLeft - (containerWidth / 2) + (selectedElementWidth / 2);
    container.scrollTo({left: scrollLeft, behavior: 'smooth'});
  }, [dates, nowDate]);


  const makeDate = () => {
    let _days = [...dates];
    // if nowDate is not in dates, _date = [];
    if (!_days.find((date) => getDateString(date) === getDateString(nowDate))) {
      _days = [];
    }
    for (let i = -7; i < 8; i++) {
      let _date = new Date(nowDate);
      _date.setDate(_date.getDate() + i);
      if (!_days.find((date) => getDateString(date) === getDateString(_date))) {
        _days.push(_date);
      }
    }
    setDates(_days);
    console.dir(_days);
  }

  const getEmotions = async () => {
    const response = await getDiaryRecentEmotion(getDateString(nowDate))
    const _emotions = {};
    response.data.forEach((element) => {
      _emotions[element.date] = element.emotion;
    });
    setEmotions(_emotions);
  }
  const randomKey = () => {
    return Math.random().toString(36).substr(2, 9);
  }

  return (
    <div className="date-picker" ref={containerRef}>
      {dates.map((date) => {
          const nowStrDate = getDateString(nowDate);
          const dateStr = getDateString(date);
          const imgSrc = getImagePathByEmotion(emotions[dateStr]);
          return (<div
            key={randomKey()}
            className={`date-picker-item ${nowStrDate === dateStr ? 'selected' : ''}`}
            onClick={() => setNowDate(date)}
          >
            <div className="date-info">
              <div>{getUsDayOfWeek(date.getDay())}</div>
              <div>{date.getDate()}</div>
            </div>

            <div className="mood-info">
              {imgSrc && <img src={imgSrc} alt="chat mood icon"
                              className="chat-emotion"
                              width="30px"/>}
            </div>
          </div>)
        }
      )}
    < /div>
  );
}

export default Datepicker;