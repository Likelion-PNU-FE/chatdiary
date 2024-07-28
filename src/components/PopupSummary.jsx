import React from 'react';
import '../styles/Popup.css';

// 감정별 이미지 맵
import angry from '../assets/angry_gra.svg';
import anxious from '../assets/anxious_gra.svg';
import embar from '../assets/embar_gra.svg';
import happy from '../assets/happy_gra.svg';
import joy from '../assets/joy_gra.svg';
import sad from '../assets/sad_gra.svg';
import soso from '../assets/soso_gra.svg';
import closeIcon from '../assets/close_icn.svg';

const emotionImages = {
  angry: angry,
  anxious: anxious,
  embar: embar,
  happy: happy,
  joy: joy,
  sad: sad,
  soso: soso
};

const emotionKorean = {
  angry: '화남',
  anxious: '불안',
  embar: '당황',
  happy: '행복',
  joy: '즐거움',
  sad: '슬픔',
  soso: '보통'
};

function PopupSummary({ emotion, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="popup-summary-overlay" onClick={handleOverlayClick}>
      <div className="popup-summary">
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="popup-content">
          <img src={emotionImages[emotion]} alt={emotion} className="emoji-icon" />
          <p>함께 쓴 일기에 담긴</p>
            <p> 당신의 감정은 <span className="highlight">{emotionKorean[emotion]}</span>이네요!</p>
          <p style={{ color: '#A9A9A9', fontSize: '12px' }}>일기가 정상적으로 기록되었습니다.</p>
          <button onClick={onClose} className="summary-button">요약 보러가기</button>
        </div>
      </div>
    </div>
  );
}

export default PopupSummary;