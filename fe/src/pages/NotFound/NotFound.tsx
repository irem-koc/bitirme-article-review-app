import { Context } from "@context/Context";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  const { userr } = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      if (userData && userr.userData?.rol === "admin") {
        navigate("/details");
      } else if (userData) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, userr]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-start justify-center h-screen"
    >
      <div className="text-center p-4">
        <img
          src="https://cdn.dribbble.com/users/2771385/screenshots/16267270/media/4d6fd1687943c6f90e7cb93111050c65.gif"
          alt="Welcome Gif"
          className="mb-4 mx-auto"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
        />
        <h1 className="text-2xl font-bold text-indigo-600">Nothing found</h1>
        <p className="text-lg">Redirecting you shortly...</p>
      </div>
    </motion.div>
  );
};

export default NotFound;
