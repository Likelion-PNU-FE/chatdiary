import PropTypes from 'prop-types';
import '../styles/Popup.css';
import angry from '../assets/angry_gra.svg';
import anxious from '../assets/anxious_gra.svg';
import embar from '../assets/embar_gra.svg';
import happy from '../assets/happy_gra.svg';
import joy from '../assets/joy_gra.svg';
import sad from '../assets/sad_gra.svg';
import soso from '../assets/soso_gra.svg';
import closeIcon from '../assets/close_icn.svg';

const emotionImages = {
  ANGRY: angry,
  ANXIOUS: anxious,
  EMBAR: embar,
  HAPPY: happy,
  JOY: joy,
  SAD: sad,
  SOSO: soso
};

const emotionKorean = {
  ANGRY: '화남',
  ANXIOUS: '불안',
  EMBAR: '당황',
  HAPPY: '행복',
  JOY: '즐거움',
  SAD: '슬픔',
  SOSO: '보통'
};

const PopupSummary = ({isVisible, emotion, onClose, onSummary}) => {
  if (!isVisible) return null;

  return (
    <div className="popup-summary-overlay">
      <div className="popup-summary">
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close"/>
        </button>
        <div className="popup-content">
          <img src={emotionImages[emotion]} alt={emotion} className="emoji-icon"/>
          <p>함께 쓴 일기에 담긴</p>
          <p>당신의 감정은 <span className="highlight">{emotionKorean[emotion]}</span>이네요!</p>
          <p style={{color: '#A9A9A9', fontSize: '12px'}}>일기가 정상적으로 기록되었습니다.</p>
          <button onClick={onSummary} className="summary-button">요약 보러가기</button>
        </div>
      </div>
    </div>
  );
};

PopupSummary.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  emotion: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSummary: PropTypes.func.isRequired,
};

export default PopupSummary;