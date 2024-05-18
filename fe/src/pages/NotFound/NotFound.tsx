import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Nothing = (props: Props) => {
  const navigate = useNavigate();
  //   const { userr } = useContext(Context);
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.getItem("userdata") ? navigate("/") : navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
        <h1 className="text-2xl font-bold text-indigo-600">Anything found</h1>
        <p className="text-lg">You're turning back... </p>
      </div>
    </motion.div>
  );
};

export default Nothing;
