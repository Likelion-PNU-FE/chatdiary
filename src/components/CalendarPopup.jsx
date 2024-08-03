import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import '../styles/Calendar.css';
import './CalendarPopup.css';
import moment from 'moment';

const CalendarPopup = ({ isVisible, onClose , selectedDate, onDateChange, onConfirm}) => {
    if (!isVisible) return null;

    return (
        <div className="CalendarPopup">
            <div className="CalendarPopup__popup-summary-overlay">
                <div className="CalendarPopup__popup-summary">
                    <Calendar
                        value={selectedDate}
                        onClickDay={onDateChange}
                        showNeighboringMonth={false}
                        formatDay={(locale, date) => moment(date).format("DD")}
                        locale="en-GB"
                    />
                    <div className="CalendarPopup__buttons">
                        <button className="CalendarPopup__close-btn" onClick={onClose}>취소</button>
                        <button className="CalendarPopup__confirm-btn" onClick={onConfirm} disabled={!selectedDate}>선택
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CalendarPopup.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default CalendarPopup;
