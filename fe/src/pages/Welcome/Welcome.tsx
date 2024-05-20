import { Context } from "@context/Context";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();
  const { userr } = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userr.userData.rol === "admin") {
        navigate("/details");
      } else {
        navigate("/");
      }
    }, 3000);

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
          src="https://www.jackson.stark.k12.oh.us/cms/lib/OH02206107/Centricity/Domain/595/blobid2.gif"
          alt="Welcome Gif"
          className="mb-4 mx-auto"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
        />
        <h1 className="text-2xl font-bold text-indigo-600">
          Hey {userr?.userData?.firstName}!
        </h1>
        <p className="text-lg">Welcome back again 😊</p>
      </div>
    </motion.div>
  );
};

export default Welcome;
