function DiarySummaryEdit({ diaryId, date, emotion, initialTitle, initialKeywords, initialContent, onSave, onClose }) {
  const [title, setTitle] = useState(initialTitle);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [content, setContent] = useState(initialContent);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const handleDeleteKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      // 백엔드에 PUT 요청을 보냅니다.
      await Api.put(`/diaries/${diaryId}`, {
        title: title,
        content: content,
        date: date, // 수정된 일기 날짜를 전달
        emotion: emotion
      });
  
      // 수정된 내용을 다시 요약 화면으로 전달
      onSave(title, keywords, content);
    } catch (error) {
      console.error('일기 수정 중 오류가 발생했습니다:', error);
    }
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
              <p>{date}</p> {/* 날짜를 표시합니다 */}
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
