import AuthContainer from "../components/AuthContainer.jsx";
import useInputs from "../hook/useInputs.js";
import {login} from "../services/apis.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [{email, password}, onChange, onSubmit] = useInputs({
    email: '',
    password: ''
  })
  const navigate = useNavigate();


  const onLogin = async () => {
    try {
      await onSubmit(login);
      navigate('/board');
    } catch (e) {
      alert('로그인 실패 :' + e.message);
    }
  }
  return (
    <AuthContainer class="login" type='login' onSubmit={onLogin}>
      <input value={email} onChange={onChange} name="email" id="login-email" type="email" placeholder="이메일"/>
      <input value={password} onChange={onChange} name="password" id="login-password" type="password"
             placeholder="비밀번호"/>
    </AuthContainer>
  );
}

export default Login;