import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "../components/layout.jsx";
import Landing from "../pages/landing.jsx";
import Board from "../pages/board.jsx";
import Chat from "../pages/chat.jsx";
import SignUp from "../pages/signUp.jsx";
import Login from "../pages/login.jsx";

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

function protectedLoader({request}) {
    const pathname = new URL(request.url).pathname;
    console.log("pathname", pathname);
    // 로그인 여부 토글
    // 추후에 api요청을 통해서 user가 로그인했는지 로직을 넣어야함
    let isAuth = true;

    if (!isAuth) {
        if (pathname === "/" || pathname === "/login" || pathname === "/signup") return null;
        return redirect("/");
    }
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return redirect("/board");
    }

    return null;
}

export default routes;
