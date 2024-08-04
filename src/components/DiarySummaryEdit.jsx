import { useState } from 'react';
import '../style/DiarySummary.scss';
import angry_gra from '../assets/angry.svg';
import anxious_gra from '../assets/anxious.svg';
import embar_gra from '../assets/embar.svg';
import happy_gra from '../assets/happy.svg';
import joy_gra from '../assets/joy.svg';
import sad_gra from '../assets/sad.svg';
import soso_gra from '../assets/soso.svg';
import closeIcon from '../assets/close_icn.svg';
import editIcon from '../assets/edit_icn.svg';

const emotionImages = {
  ANGRY: angry_gra,
  ANXIOUS: anxious_gra,
  EMBAR: embar_gra,
  HAPPY: happy_gra,
  JOY: joy_gra,
  SAD: sad_gra,
  SOSO: soso_gra
};

function DiarySummaryEdit({ emotion, initialTitle, initialKeywords, initialContent, onSave, onClose }) {
  const [title, setTitle] = useState(initialTitle);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [content, setContent] = useState(initialContent);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const handleDeleteKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(title, keywords, content);
  };

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
              <div className="title-container">
                {!isEditingTitle ? (
                  <h3 className="editable-title">
                    <img 
                      src={editIcon} 
                      alt="Edit" 
                      className="edit-icon" 
                      onClick={() => setIsEditingTitle(true)}
                    />
                    {title}
                  </h3>
                ) : (
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="edit-title-input" 
                    onBlur={() => setIsEditingTitle(false)}
                  />
                )}
              </div>
              <p>2024.07.12</p>
              <div className="keywords">
                <span className="keyword-title">KeyWord</span>
                {keywords.map((keyword, index) => (
                  <span className="keyword" key={index}>
                    {keyword}
                    <img 
                      src={closeIcon} 
                      alt="Remove" 
                      className="remove-keyword-icon" 
                      onClick={() => handleDeleteKeyword(index)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="summary-body">
          <h4>
            내용
            <img 
              src={editIcon} 
              alt="Edit" 
              className="edit-icon" 
              onClick={() => setIsEditingContent(true)}
            />
          </h4>
          {!isEditingContent ? (
            <p className="editable-content">{content}</p>
          ) : (
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="edit-content-textarea" 
              onBlur={() => setIsEditingContent(false)}
            />
          )}
        </div>
        <div className="summary-buttons">
          <button className="edit-save-button" onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default DiarySummaryEdit;