import { Context } from "@context/Context";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};
//reviewer veya admin olarak tanımla

const Logout = (props: Props) => {
  const navigate = useNavigate();
  const { userr } = useContext(Context);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-start justify-center mt-4 h-screen"
    >
      <div className="text-center">
        <img
          typeof="gif"
          src="https://media0.giphy.com/media/trGtPJai2xwI/giphy.gif?cid=6c09b9520hig3dfgwiriltzno57lulo5k18115iw6bcvgqum&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="Bye Gif"
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-indigo-600">
          See you again {userr.userData.firstName}!
        </h1>
        <p className="text-lg">Until next time, take care 👋</p>
      </div>
    </motion.div>
  );
};

export default Logout;
