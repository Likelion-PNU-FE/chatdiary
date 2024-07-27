import React, { useState } from 'react';
import '../styles/Popup_emoji.css';
import angry from '../assets/angry_gra.svg';
import anxious from '../assets/anxious_gra.svg';
import happy from '../assets/happy_gra.svg';
import embar from '../assets/embar_gra.svg';
import soso from '../assets/soso_gra.svg';
import joy from '../assets/joy_gra.svg';
import sad from '../assets/sad_gra.svg';
import strength from '../assets/strength_gra.svg';
import close_ico from '../assets/close_icn.svg';

const emotionImages = {
  angry,
  anxious,
  soso,
  embar,
  happy,
  joy,
  sad,
  strength,
};

function Popup({ main_emo, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    title: 'GPT가 추천한 제목...',
    date: '2024.07.12',
    keyword: 'KeyWord',
    tag1: '조별과제',
    tag2: '잡수',
    text: '오늘 조별과제를 했는데... (이하 내용)',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsCompleted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          <img src={close_ico} alt="Close" />
        </button>
        {isCompleted ? (
          <DiaryCompletion content={formData} onClose={onClose} />
        ) : isEditing ? (
          <ContentEdit
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveClick={handleSaveClick}
            onClose={onClose}
          />
        ) : (
          <ContentDisplay content={formData} handleEditClick={handleEditClick} />
        )}
      </div>
    </div>
  );
}

function ContentDisplay({ content, handleEditClick }) {
  return (
    <div className="content-display">
      <h2>{content.title}</h2>
      <p>{content.date}</p>
      <p>{content.keyword}</p>
      <div className="tags">
        <span className="tag">{content.tag1}</span>
        <span className="tag">{content.tag2}</span>
      </div>
      <p className="text-content">{content.text}</p>
      <div className="buttons">
        <button className="edit-button" onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

function ContentEdit({ formData, handleInputChange, handleSaveClick, onClose }) {
  return (
    <div className="content-edit">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="keyword"
        value={formData.keyword}
        onChange={handleInputChange}
      />
      <textarea
        name="text"
        value={formData.text}
        onChange={handleInputChange}
      />
      <div className="buttons">
        <button className="delete-button" onClick={onClose}>삭제</button>
        <button className="save-button" onClick={handleSaveClick}>저장</button>
      </div>
    </div>
  );
}

function DiaryCompletion({ content, onClose }) {
  return (
    <div className="diary-completion">
      <img src={emotionImages[content.emotion]} alt="emotion" />
      <p>함께 쓴 일기에 담긴 당신의 감정은 <span className="highlight">{content.emotion}</span>이네요!</p>
      <p>일기가 정상적으로 기록되었습니다.</p>
      <button className="summary-button" onClick={onClose}>요약 보러가기</button>
    </div>
  );
}

export default Popup;
