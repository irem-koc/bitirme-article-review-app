import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();

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
          src="https://www.jackson.stark.k12.oh.us/cms/lib/OH02206107/Centricity/Domain/595/blobid2.gif"
          alt="Thanks Gif"
          className="mb-4 mx-auto"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
        />
        <h1 className="text-2xl font-bold text-indigo-600">Congratulations!</h1>
        <p className="text-lg">Your review has been submitted successfully.</p>
      </div>
    </motion.div>
  );
};

export default Welcome;
