import { Context } from "@context/Context";
import Navbar from "@molecules/Navbar/Navbar";
import verifySession from "@services/verifySession";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
function App() {
  const { userr } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt") && !userr.isUserLoggedIn) {
      verifySession().then((res) => {
        if (res.status === "SUCCESS") {
          navigate("/");
        } else {
          navigate("/login");
          localStorage.setItem("jwt", "");
          localStorage.setItem("userdata", "");
        }
      });
    }
  }, [userr, navigate]);
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
}
export default App;
// TODO: Tailwind, redux tk, tailwind, import alias, reusable components,
