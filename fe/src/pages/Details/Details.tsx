import getAllReviews from "@services/getAllReviews";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const Details = (props: Props) => {
  const [tasks, setTasks] = useState();
  const location = useLocation();

  const [errorText, setErrorText] = useState<string | undefined>();
  const handleLogin = async () => {
    try {
      const res = await getAllReviews();
      setTasks(res);
    } catch (error) {
      setErrorText(error.message);
    }
  };
  useEffect(() => {
    handleLogin();
  }, [location.pathname]);
  const {} = props;
  return (
    <div>
      {errorText ? <p className="error">{errorText}</p> : null}
      {tasks?.map((task) => (
        <div>
          <div>{task.title}</div>
          <div>{task.scores}</div>
          <div>{task.review}</div>
          <div>{task.overallAssessment}</div>
          <div>{task.detailedComments}</div>
        </div>
      ))}
    </div>
  );
};

export default Details;
