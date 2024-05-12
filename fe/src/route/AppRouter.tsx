import Home from "@pages/Home/Home";

import FourthStep from "@organisms/FourthStep/FourthStep";
import LastStep from "@organisms/LastStep/LastStep";
import SecondStep from "@organisms/SecondStep/SecondStep";
import ThirdStep from "@organisms/ThirdStep/ThirdStep";
import Details from "@pages/Details/Details";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import FirstStep from "@organisms/FirstStep/FirstStep";
import Success from "@pages/Success/Success";
import Signup from "@pages/Signup/Signup";
import Login from "@pages/Login/Login";

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
