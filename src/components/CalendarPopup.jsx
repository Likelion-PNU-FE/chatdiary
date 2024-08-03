import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import '../styles/Calendar.css';
import './CalendarPopup.css';
import moment from 'moment';

const CalendarPopup = ({ isVisible, onClose , selectedDate, onDateChange, onConfirm}) => {
    if (!isVisible) return null;

    return (
        <div className="popup-summary-overlay">
            <div className="popup-summary">
            <Calendar
                value={selectedDate}
                onClickDay={onDateChange}
                showNeighboringMonth={false}
                formatDay={(locale, date) => moment(date).format("DD")}
                locale="en-GB" // 영어 달력이 더 이뻐보여서 설정했어요. 한글로 설정하려면 지우시면 됩니당
            />
                <div className="buttons">
                    <button className="confirm-btn" onClick={onConfirm} disabled={!selectedDate}>선택</button>
                    <button className="close-btn" onClick={onClose}>취소</button>
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
