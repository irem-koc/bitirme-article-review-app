import { Context } from "@context/Context";
import getAllReviews from "@services/getAllReviews";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Details = (props: Props) => {
  const { tasks, setTasks } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const handleLogin = async () => {
    try {
      const res = await getAllReviews();
      setTasks(res);
    } catch (error) {
      navigate("/login");
      setErrorText(error.message);
    }
  };

  useEffect(() => {
    handleLogin();
  }, [location.pathname]);

  const calculateTotalWeight = (scores) => {
    const weights = [0.35, 0.25, 0.2, 0.2];
    return scores.reduce((total, score, index) => {
      return total + score * weights[index];
    }, 0);
  };

  const calculateAverageWeight = () => {
    if (tasks && tasks.length > 0) {
      const totalWeight = tasks.reduce((total, task) => {
        return total + calculateTotalWeight(task.scores);
      }, 0);
      return (totalWeight / tasks.length).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div>
      {errorText ? <p className="error">{errorText}</p> : null}
      <span>{tasks?.length} adet review girdiniz.</span>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Score A (weight * %35)
              </th>
              <th scope="col" className="px-6 py-3">
                Score B (weight * %25)
              </th>
              <th scope="col" className="px-6 py-3">
                Score C (weight * %20)
              </th>
              <th scope="col" className="px-6 py-3">
                Score D (weight * %20)
              </th>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.id}
                </th>
                <td className="px-6 py-4">{task.title}</td>
                {task.scores.slice(0, 4).map((score, index) => (
                  <td key={index} className="px-6 py-4">
                    {score}
                  </td>
                ))}
                {Array(4 - task.scores.length)
                  .fill("")
                  .map((_, index) => (
                    <td key={index + task.scores.length} className="px-6 py-4">
                      -
                    </td>
                  ))}
                <td className="px-6 py-4">
                  {calculateTotalWeight(task.scores).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Weight: {calculateAverageWeight()}</p>
      </div>
    </div>
  );
};

export default Details;
