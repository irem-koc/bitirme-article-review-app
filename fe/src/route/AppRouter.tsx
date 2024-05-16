import Home from "@pages/Home/Home";

import FirstStep from "@organisms/FirstStep/FirstStep";
import FourthStep from "@organisms/FourthStep/FourthStep";
import LastStep from "@organisms/LastStep/LastStep";
import SecondStep from "@organisms/SecondStep/SecondStep";
import ThirdStep from "@organisms/ThirdStep/ThirdStep";
import Details from "@pages/Details/Details";
import Login from "@pages/Login/Login";
import Logout from "@pages/Logout/Logout";
import Signup from "@pages/Signup/Signup";
import Success from "@pages/Success/Success";
import Welcome from "@pages/Welcome/Welcome";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <FirstStep />,
          },
          {
            path: "/review/2",
            element: <SecondStep />,
          },

          {
            path: "/review/3",
            element: <ThirdStep />,
          },
          {
            path: "/review/4",
            element: <FourthStep />,
          },
          {
            path: "/review/5",
            element: <LastStep />,
          },
        ],
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
export default router;
