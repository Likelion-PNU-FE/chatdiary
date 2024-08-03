import useInputs from "../hook/useInputs.js";
import AuthContainer from "../components/AuthContainer.jsx";
import './SignUp.scss'
import {signUp} from "../services/apis.js";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
  const [{email, password, nickname}, onChange, onSubmit] = useInputs({
    email: '',
    password: '',
    nickname: ''
  })
  const navigate = useNavigate();

  const onSignUp = async () => {
    try {
      await onSubmit(signUp);
      alert('회원가입 성공!🎉🎉');
      navigate('/login');
    } catch (e) {
      alert(`회원가입 실패 : ${e}`);
    }
  }
  return (
    <AuthContainer type='signUp' onSubmit={onSignUp}>
      <div className="box">
        <input value={nickname} onChange={onChange} name="nickname" id="signUp-name" type="text" placeholder="이름"/>
      </div>
      <div className="box">
        <input value={email} onChange={onChange} name="email" id="signUp-email" type="email" placeholder="이메일"/>
      </div>
      <div className="box">
        <input value={password} onChange={onChange} name="password" id="signUp-password" type="password"
               placeholder="비밀번호"/>
      </div>
    </AuthContainer>
  );
}

export default SignUp;