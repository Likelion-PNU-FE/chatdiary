// 휴대폰크기 화면으로 제한
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="layout">
            <Outlet/>
        </div>
    );
}

export default Layout;