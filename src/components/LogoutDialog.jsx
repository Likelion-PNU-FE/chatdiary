import Dialog from "./Dialog.jsx";
import './LogoutDialog.scss';
import {useNavigate} from "react-router-dom";

const LogoutDialog = ({isOpen, setOpen, user}) => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Dialog isOpen={isOpen} setOpen={setOpen}>
      <div className="logout-dialog">
        <div className="user-info">
          <div className="tile">
            <p className="label">이름</p>
            <p>|</p>
            <p className="value">{user?.name || ''}</p>
          </div>
          <div className='tile'>
            <p className="label">이메일</p>
            <p>|</p>
            <p className="value">{user?.email || ''}</p>
          </div>
        </div>
        <button className="action primary tile" onClick={logout}>로그아웃</button>
      </div>
    </Dialog>
  );
}

export default LogoutDialog;