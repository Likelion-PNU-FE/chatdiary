import oopsGra from "../assets/oops_gra.svg";
import chatIcon from "../assets/chat_icn.svg";
import {getImagePathByEmotion} from "../utils/utils.js";
import deleteIcon from "../assets/deleteIcn.svg";

const ChatSummary = ({diaryContent, diaryError, goChat, goEdit, goDelete}) => {
  if (diaryError || !diaryContent) {
    const isEmpty = diaryError?.response?.status === 409
    return (
      <div className="empty-summary">
        <img src={oopsGra} alt="opps image"/>
        <p>Oops! {isEmpty ? '기록한 대화가 없어요!' : '무언가 잘못됐어요!'}</p>
        {isEmpty
          &&
          <button className="chat-button" onClick={goChat}>
            <img src={chatIcon} alt="chat icon" className="chat-icon"/>
            <span>대화하러 가기</span>
          </button>
        }
      </div>
    );
  }

  return (
    <div className="summary-content">
      <div className="header-top">
        <img src={getImagePathByEmotion(diaryContent.emotion)} alt="chat mood icon"
             className="chat-emotion" width="60px"/>
        <div className="header-text">
          <div className="header-text-top">
            {diaryContent.title}
            <div className="buttons">
              <button className="edit-button" onClick={goEdit}>Edit</button>
              <img
                src={deleteIcon}
                alt="deleteIcn"
                width="20px"
                color="0xFFFFF"
                className="delete-icon"
                onClick={() => goDelete(diaryContent.id)}
              />
              <img src={deleteIcon} alt="deleteIcn" width="20px" color="0xFFFFF"/>
            </div>
          </div>
          <p>{diaryContent.date}</p>
          <div className="keywords">
            <span className="keyword-title">KeyWord</span>
            <span className="keyword">{diaryContent.keyword1}</span>
            <span className="keyword">{diaryContent.keyword2}</span>
            <span className="keyword">{diaryContent.keyword3}</span>
          </div>
        </div>
      </div>
      <hr className="divider"/>
      <div className="summary-body">
        <h4>내용</h4>
        <p>{diaryContent.content}</p>
      </div>
    </div>
  );
};

export default ChatSummary;