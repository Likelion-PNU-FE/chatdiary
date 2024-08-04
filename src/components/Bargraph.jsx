import { getImagePathByEmotion } from '../utils/utils.js'; // utils.js에서 함수 import
import anxiousImg from "../assets/anxious.svg";
import sosoImg from "../assets/soso.svg";
import strengthImg from "../assets/strength.svg";
import joyImg from "../assets/joy.svg";
import happyImg from "../assets/happy.svg";
import angryImg from "../assets/angry.svg";
import embarImg from "../assets/embar.svg";
import sadImg from "../assets/sad.svg";

// 이미지 경로를 저장할 객체
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

const Bargraph = ({ version, apiData }) => {
    if (!Array.isArray(apiData)) {
        return <p>데이터를 불러오는 중입니다...</p>; // 오류 처리
    }

    const sortedBars = [...apiData].sort((a, b) => b.count - a.count);
    const barsToShow = version === 1 ? sortedBars.slice(0, 3) : sortedBars;

    return (
        <div className="bar-graph">
            {barsToShow.map((bar) => {
                const emotionImageKey = getImagePathByEmotion(bar.emotion); // 이미지 키 가져오기
                const emotionImage = imagePaths[emotionImageKey]; // 이미지 경로 가져오기

                return (
                    <div key={bar.emotion} className="bar-all">
                        <Bar
                            height={`${(bar.count / 8) * 100}%`}
                            color={getColor(bar.emotion)}
                            emotion={emotionImage} // 이미지 경로 전달
                        />
                        {version === 2 && <p>{bar.count}</p>}
                    </div>
                );
            })}
        </div>
    );
};

// 감정에 따라 색상 반환
const getColor = (emotion) => {
    switch (emotion) {
        case '화남':
            return '#F75A6D';
        case '슬픔':
            return '#83B2FD';
        case '행복':
            return '#BAD2FF';
        case '즐거움':
            return '#86EC9E';
        case '힘듦':
            return '#FF746B';
        case '당황스러움':
            return '#FB9964';
        case '보통':
            return '#FFD873';
        case '불안':
            return '#5364FF';
        default:
            return '#f0f0f0';
    }
};

const Bar = ({ height, color, emotion }) => {
    return (
        <div className="bar">
            <div className="fill" style={{ height, backgroundColor: color }}>
                <img src={emotion} alt="emotion" className="emoji" />
            </div>
        </div>
    );
};

export default Bargraph;
