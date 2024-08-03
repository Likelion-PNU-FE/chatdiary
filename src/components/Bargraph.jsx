const Bargraph = () => {

    const bars = [
        {height: '30%', color: '#FF6B6B', emoji: '😡'},
        {height: '50%', color: '#4D4DFF', emoji: '😞'},
        {height: '80%', color: '#32FF7E', emoji: '😍'},
    ];


    return (
        <div className="bar-graph">
            {bars.map((bar, index) => (
                <Bar key={index} height={bar.height} color={bar.color} emoji={bar.emoji}/>
            ))}
        </div>
    );

}

const Bar = ({height, color, emoji}) => {
    return (
        <div className="bar">
            <div className="fill" style={{height: height, backgroundColor: color}}>
                <div className="emoji">{emoji}</div>
            </div>
        </div>
    );
}
export default Bargraph;