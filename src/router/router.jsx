import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Landing from "../pages/Landing.jsx";
import Board from "../pages/Board.jsx";
import Chat from "../pages/Chatpage.jsx";
import SignUp from "../pages/SignUp.jsx";
import Login from "../pages/Login.jsx";
import {getMyInfo} from "../services/apis.js";

const routes = createBrowserRouter([
  {
    id: 'root',
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
  if (!data) {
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") return null;
    return redirect("/");
  }
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return redirect("/board");
  }
  console.log("protectedLoader2", data);
  return null;
}

async function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await getMyInfo();
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export default routes;
