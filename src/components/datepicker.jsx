import {useEffect, useRef} from "react";
import {getImagePathByEmotion} from "../utils/utils.js";
import anxiousImg from "../assets/anxious.svg";
import sosoImg from "../assets/soso.svg";
import strengthImg from "../assets/strength.svg";
import joyImg from "../assets/joy.svg";
import happyImg from "../assets/happy.svg";
import angryImg from "../assets/angry.svg";
import embarImg from "../assets/embar.svg";
import sadImg from "../assets/sad.svg";

const Datepicker = ({days, nowIndex, setIndex}) => {
    const containerRef = useRef(null);

    const handleClick = (index) => {
        setIndex(index);
    };

    useEffect(() => {
        const container = containerRef.current;
        const selectedElement = container.children[nowIndex];
        const containerWidth = container.offsetWidth;
        const selectedElementWidth = selectedElement.offsetWidth;
        const scrollLeft = selectedElement.offsetLeft - (containerWidth / 2) + (selectedElementWidth / 2);
        container.scrollTo({left: scrollLeft, behavior: 'smooth'});
    }, [nowIndex]);
    return (
        <div className="date-picker" ref={containerRef}>
            {days.map((day, index) => (
                <div
                    key={index}
                    className={`date-picker-item ${index === nowIndex ? 'selected' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    <div className="date-info">
                        <div>{day.day}</div>
                        <div>{day.date}</div>
                    </div>

                    <div className="mood-info">
                        <img src={getImagePathByEmotion(day.emotion)} alt="chat mood icon" className="chat-emotion"
                             width="30px"/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Datepicker;