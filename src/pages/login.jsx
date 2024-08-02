import AuthContainer from "../components/authContainer.jsx";
import useInputs from "../hook/useInputs.js";
import {login} from "../services/apis.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [{email, password}, onChange] = useInputs({
        email: '',
        password: ''
    })
    const navigate = useNavigate();


    const onSubmit = async () => {
        console.log('submit');
        try {
            const response = await login({email, password});
            console.log(response);
            navigate('/board');
        } catch (e) {
            console.error(e);
        }
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