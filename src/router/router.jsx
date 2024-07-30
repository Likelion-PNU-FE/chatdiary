import { createBrowserRouter, redirect } from "react-router-dom";
import ChatPage from "../components/Chatpage.jsx";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
  },
  {
    path: 'chat',
    element: <ChatPage />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  }
]);

function protectedLoader({ request }) {
  const pathname = new URL(request.url).pathname;
  console.log("pathname", pathname);
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
