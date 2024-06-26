import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Nothing = (props: Props) => {
  const navigate = useNavigate();
  //   const { userr } = useContext(Context);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

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
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGM2OHk5c2FubXJmYzJzcmNicDJxZmoxNjRzcTE5OHlkcnlxaDZ2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dHM/RVaX21AzzGIEUpkEM9/giphy.gif"
          alt="Welcome Gif"
          className="mb-4 mx-auto"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
        />
        <h1 className="text-2xl font-bold text-indigo-600">Nothing</h1>
        <p className="text-lg">There is no review to show here!</p>
      </div>
    </motion.div>
  );
};

export default Nothing;
