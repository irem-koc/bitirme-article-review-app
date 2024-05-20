import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Success = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/details");
    }, 300000);

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
          src="https://media.tenor.com/oOKAO1IJ5X8AAAAi/thanks-thanks-gifs.gif"
          alt="Thanks Gif"
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold text-indigo-600">Congratulations!</h1>
        <p className="text-lg">
          Your review has been submitted successfully 💫
        </p>
      </div>
    </motion.div>
  );
};

export default Success;
