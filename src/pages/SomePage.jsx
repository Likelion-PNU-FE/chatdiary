import { useState } from 'react';
import CalendarPopup from '../components/CalendarPopup';

const SomePage = () => {
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirm = () => {
        alert(`Selected date: ${selectedDate.toLocaleDateString()}`); // 날짜 팝업 보이게 해놨음
        setCalendarVisible(false);
    };

    return (
        <div>
            <button onClick={() => setCalendarVisible(true)}>날짜 선택</button>
            <CalendarPopup
                isVisible={isCalendarVisible}
                onClose={() => setCalendarVisible(false)}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default SomePage;
