import PropTypes from 'prop-types';
import Bargraph from './bargraph.jsx';
import './MoodChart.scss';
import closeIcon from "../assets/close_icn.svg";
import '../components/Bargraph.scss'


const BargraphPopup = ({ isVisible, onClose, month, apiData }) => {
    if (!isVisible) return null;

    return (
        <div>
            <div className="overlay" style={{ display: isVisible ? 'block' : 'none' }}></div>
            <div className="popup">
                <div className="close-btn">
                    <img src={closeIcon} alt="close" width="26px" onClick={onClose} />
                </div>
                <h2>{month}월 Mood Chart</h2>
                <div className="graph">
                    <Bargraph version={2} apiData={apiData}/>
                </div>
            </div>
        </div>
    );
};


BargraphPopup.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BargraphPopup;
