import useInputs from "../hook/useInputs.js";
import AuthContainer from "../components/AuthContainer.jsx";
import './SignUp.scss'

const SignUp = () => {
  const [{email, password, name}, onChange, reset] = useInputs({
    email: '',
    password: '',
    name: ''
  })

  const onSubmit = () => {
    console.log('submit');
    reset();
  }

  return (
    <AuthContainer type='signUp' onSubmit={onSubmit}>
      <div className="box">
        <input value={name} onChange={onChange} name="name" id="signUp-name" type="text" placeholder="이름"/>
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