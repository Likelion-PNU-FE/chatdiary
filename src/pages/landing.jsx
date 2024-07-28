import mainLogo from '../assets/chat_diary.svg';
import emojiList from '../assets/main_img.svg';

const Landing = () => {
    return (
        <div className="col-center login">
            <h3 className="sub-title">대화로 기록하는 오늘 하루,</h3>
            <img className="title" src={mainLogo} alt="mainLogo" width="150px"/>
            <img src={emojiList} alt="imoList" height="160px"/>
            <button className="primary">로그인</button>
            <button className="secondary">회원가입</button>
        </div>
    );
}

export default Landing;