import { Context } from "@context/Context";
import Navbar from "@molecules/Navbar/Navbar";
import verifySession from "@services/verifySession";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const { userr } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt") && !userr.isUserLoggedIn) {
      verifySession().then((res) => {
        if (res.status === "SUCCESS") {
          navigate("/");
        } else if (res.data.status === "FAILED") {
          navigate("/");
        }
      });
    }
  }, [userr.isLoggedIn, navigate, verifySession]);
  return (
    <h1 className="">
      <Navbar />
      <Outlet />
    </h1>
  );
}
export default App;
// TODO: Tailwind, redux tk, tailwind, import alias, reusable components,
