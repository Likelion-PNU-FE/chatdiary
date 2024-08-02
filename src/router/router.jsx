import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "../components/layout.jsx";
import Landing from "../pages/landing.jsx";
import Board from "../pages/board.jsx";
import Chat from "../pages/Chatpage.jsx";
import SignUp from "../pages/signUp.jsx";
import Login from "../pages/login.jsx";
import {getMyInfo} from "../services/apis.js";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        loader: protectedLoader,
        children: [
            // 회원관련
            {
                path: '',
                Component: Landing,
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'signup',
                Component: SignUp,
            },
            //이후는 로그인 해야 이용 가능한 페이지
            {
                path: 'board',
                Component: Board,
            },
            {
                path: 'chat',
                Component: Chat,
            },
            {
                path: '*',
                Component: () => <div>404 Not Found</div>
            }

        ]
    }
]);

async function protectedLoader({request}) {
    const pathname = new URL(request.url).pathname;
    const data = await checkAuth();
    console.log("protectedLoader", data);

    if (!data) {
        if (pathname === "/" || pathname === "/login" || pathname === "/signup") return null;
        return redirect("/");
    }
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return redirect("/board");
    }

    return null;
}

async function checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const data = await getMyInfo();
            console.log("checkAuth", data);
            return data
        } catch (e) {
            console.log("checkAuth", e);
            return false;
        }
    }
    return false;
}

export default routes;
