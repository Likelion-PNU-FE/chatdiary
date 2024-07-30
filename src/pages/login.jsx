import AuthContainer from "../components/authContainer.jsx";
import useInputs from "../hook/useInputs.js";

const Login = () => {
    const [{email, password}, onChange, reset] = useInputs({
        email: '',
        password: ''
    })

    const onSubmit = () => {
        console.log('submit');
        reset();
    }
    return (
        <AuthContainer class="login" type='login' onSubmit={onSubmit}>
            <input value={email} onChange={onChange} name="email" id="login-email" type="email" placeholder="이메일"/>

            <input value={password} onChange={onChange} name="password" id="login-password" type="password"
                   placeholder="비밀번호"/>


        </AuthContainer>
    );
}

export default Login;