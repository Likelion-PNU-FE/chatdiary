import mainLogo from '../assets/chat_diary.svg';
import emojiList from '../assets/main_img.svg';
import {Link} from "react-router-dom";
import './Landing.scss';

const Landing = () => {
  return (
    <div className="col-center landing">
      <h3 className="sub-title">대화로 기록하는 오늘 하루,</h3>
      <img className="title" src={mainLogo} alt="mainLogo" width="150px"/>
      <img src={emojiList} alt="imoList" height="160px"/>
      <Link className="action primary" to='/login'>로그인</Link>
      <Link className="action secondary" to='/signup'>회원가입</Link>
    </div>
  );
}

export default Landing;