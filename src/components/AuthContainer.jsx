import emojiList from "../assets/main_img.svg";
import signUpLogo from "../assets/signUp.svg";
import loginLogo from "../assets/login.svg";
import kakaoLogo from "../assets/kakao_logo.svg";
import {Link} from "react-router-dom";
import './AuthContainer.scss';

const AuthContainer = ({type, children, onSubmit}) => {
  // type은 login , signup 둘 중 하나
  // default로 로그인으로 하여 비교를 할 것

  const isLogin = type === 'login';

  return (
    <div className="col-center auth-container">
      <img src={emojiList} alt="imoList" height="160px"/>
      <img className="title" src={isLogin ? loginLogo : signUpLogo} alt="imoList"/>
      <p className="sub-title">하루 감정을 기록해봐요.</p>
      <form className="large">
        {children}
      </form>
      {
        isLogin &&
        <div className="social">
          <div className="divider">
            <span>소셜 로그인</span>
          </div>
          <a>
            <img src={kakaoLogo} alt="kakaoLogin" width="45px"/>
          </a>
        </div>
      }
      <a className="action primary" onClick={onSubmit}>
        {isLogin ? '로그인' : '회원가입'}</a>
      <span className="advice">
                계정이 {isLogin ? '없' : '있'}으신가요? <Link
        to={isLogin ? '/signup' : '/login'}>{isLogin ? '회원가입' : '로그인'}</Link>
            </span>


    </div>
  );

};

export default AuthContainer;