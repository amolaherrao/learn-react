import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import NoPage from "^/NoPage";
import Home from "^/Home";
import About from "^/About";
import Contact from "^/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
