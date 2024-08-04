import React from 'react';
import '../style/DiarySummary.css';
import angry_gra from '../assets/angry.svg';
import anxious_gra from '../assets/anxious.svg';
import embar_gra from '../assets/embar.svg';
import happy_gra from '../assets/happy.svg';
import joy_gra from '../assets/joy.svg';
import sad_gra from '../assets/sad.svg';
import soso_gra from '../assets/soso.svg';
import closeIcon from '../assets/close_icn.svg';

// 감정별 이미지 매핑
const emotionImages = {
  ANGRY: angry_gra,
  ANXIOUS: anxious_gra,
  EMBAR: embar_gra,
  HAPPY: happy_gra,
  JOY: joy_gra,
  SAD: sad_gra,
  SOSO: soso_gra
};

function DiarySummaryView({ emotion, title, keywords, content, onEdit, onClose }) {
  return (
    <div className="diary-summary-overlay" onClick={(e) => e.target.classList.contains('diary-summary-overlay') && onClose()}>
      <div className="diary-summary">
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="summary-header">
          <div className="header-top">
            <img src={emotionImages[emotion]} alt={emotion} className="emoji-icon" />
            <div className="header-text">
              <h3>{title}</h3>
              <p>2024.07.12</p>
              <div className="keywords">
                <span className="keyword-title">KeyWord</span>
                {keywords.map((keyword, index) => (
                  <span className="keyword" key={index}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="summary-body">
          <h4>내용</h4>
          <p>{content}</p>
        </div>
        <div className="summary-buttons">
          <button className="edit-button" onClick={onEdit}>수정</button>
          <button className="save-button" onClick={onClose}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default DiarySummaryView;
