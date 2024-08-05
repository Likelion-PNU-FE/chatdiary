import { getImagePathByEmotion } from '../utils/utils.js'; // utils.js에서 함수 import
import '../components/Bargraph.scss'

// 이미지 경로를 저장할 객체

const Bargraph = ({ version, apiData }) => {
    if (!Array.isArray(apiData)) {
        return <p>데이터를 불러오는 중입니다...</p>; // 오류 처리
    }

    const sortedBars = [...apiData].sort((a, b) => b.count - a.count);
    const barsToShow = version === 1 ? sortedBars.slice(0, 4) : sortedBars;

    return (
        <div className="bar-graph">
            {barsToShow.map((bar) => {
                return (
                    <div key={bar.emotion} className="bar-all">
                        <Bar
                            height={`${(bar.count / 10) * 100+20}%`}
                            color={getColor(bar.emotion)}
                            emotion={getImagePathByEmotion(bar.emotion)} // 이미지 경로 전달
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
        case 'ANGRY':
            return '#F75A6D';
        case 'SAD':
            return '#83B2FD';
        case 'HAPPY':
            return '#BAD2FF';
        case 'EXCITED':
            return '#86EC9E';
        case 'TIRED':
            return '#FF746B';
        case 'EMBARRASSED':
            return '#FB9964';
        case 'NEUTRAL':
            return '#FFD873';
        case 'ANXIOUS':
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
