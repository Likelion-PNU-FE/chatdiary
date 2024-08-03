import {getImagePathByEmotion} from '../utils/utils.js'; // utils.js에서 함수 import


// Mock API 데이터
const apiData = [
    {emotion: '불안', count: 2},
    {emotion: '보통', count: 5},
    {emotion: '힘듦', count: 1},
    {emotion: '즐거움', count: 8},
    {emotion: '행복', count: 6},
    {emotion: '화남', count: 3},
    {emotion: '당황스러움', count: 4},
    {emotion: '슬픔', count: 2},
];

const Bargraph = ({version}) => {
    // 버전 1: 가장 높은 3개의 감정만 표시
    const sortedBars = [...apiData].sort((a, b) => b.count - a.count);
    const barsToShow = version === 1 ? sortedBars.slice(0, 3) : sortedBars;

    return (
        <div className="bar-graph">
            {barsToShow.map((bar, index) => (
                <div key={bar.emotion} className="bar-all">
                    <Bar
                        key={index}
                        height={`${(bar.count / 8) * 100}%`}
                        color={getColor(bar.emotion)}
                        imagePath={getImagePathByEmotion(bar.emotion)}
                        count={bar.count} // 카운트 추가
                    />
                    {version === 2 && <p>{bar.count}</p>}

                </div>
            ))}
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

const Bar = ({height, color, imagePath}) => {
    return (
        <div className="bar">
            <div className="fill" style={{height, backgroundColor: color}}>
                <img src={imagePath} alt="emotion" className="emoji"/>
            </div>
        </div>
    );
};

export default Bargraph;
