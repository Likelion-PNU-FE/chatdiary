import React from 'react';
import '../styles/DiarySummary.css';
import angry_gra from '../assets/angry.svg';
import anxious_gra from '../assets/anxious.svg';
import embar_gra from '../assets/embar.svg';
import happy_gra from '../assets/happy.svg';
import joy_gra from '../assets/joy.svg';
import sad_gra from '../assets/sad.svg';
import soso_gra from '../assets/soso.svg';
import closeIcon from '../assets/close_icn.svg';

const emotionImages = {
  angry: angry_gra,
  anxious: anxious_gra,
  embar: embar_gra,
  happy: happy_gra,
  joy: joy_gra,
  sad: sad_gra,
  soso: soso_gra
};

function DiarySummary({ emotion, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('diary-summary-overlay')) {
      onClose();
    }
  };

  return (
    <div className="diary-summary-overlay" onClick={handleOverlayClick}>
      <div className="diary-summary">
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="summary-header">
          <div className="header-top">
            <img src={emotionImages[emotion]} alt={emotion} className="emoji-icon" />
            <div className="header-text">
              <h3>GPT가 추천한 제목...</h3>
              <p>2024.07.12</p>
              <div className="keywords">
                <span className="keyword-title">KeyWord</span>
                <span className="keyword">조별과제</span>
                <span className="keyword">잠수</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="summary-body">
          <h4>내용</h4>
          <p>
            오늘 조별과제를 했는데 어떤놈이 잠수를 탔다. 
            자료조사라는 놈이 잠수를 타버려서 매우 화가났다.과제 제출 2일 전이라 그 놈의 분량까지 하루종일
            밤새워가며 했다. 처음에는 오지 않은 친구 때문에 화가 났고, 그 친구의 과제를 하며 체념을 하였고
            이후에는 그냥 해탈했다. 다른 조원과 함께 과제를 마무리 하고, 치킨에 맥주를 먹으며 하루의 마무리를 
            지었다. 내용 내용 .. 내용 ..
          </p>
        </div>
        <div className="summary-buttons">
          <button className="edit-button">수정</button>
          <button className="save-button">저장</button>
        </div>
      </div>
    </div>
  );
}

export default DiarySummary;