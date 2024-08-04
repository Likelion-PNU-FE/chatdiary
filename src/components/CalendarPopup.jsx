import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import './CalendarPopup.css';
import moment from 'moment';
import {useState} from "react";

const CalendarPopup = ({isVisible, setVisible, nowDate, setNowDate}) => {

  const [date, setDate] = useState(new Date(nowDate));
  const handleConfirm = () => {
    setNowDate(date);
    setVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="CalendarPopup">
      <div className="CalendarPopup__popup-summary-overlay">
        <div className="CalendarPopup__popup-summary">
          <Calendar
            value={date}
            onClickDay={setDate}
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("DD")}
            locale="en-GB"
          />
          <div className="CalendarPopup__buttons">
            <button className="CalendarPopup__close-btn" onClick={() => setVisible(false)}>취소</button>
            <button className="CalendarPopup__confirm-btn" onClick={handleConfirm} disabled={!nowDate}>선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CalendarPopup;
