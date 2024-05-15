import { Context } from "@context/Context";
import getAllReviews from "@services/getAllReviews";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const Details = (props: Props) => {
  const { tasks, setTasks } = useContext(Context);
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
      {tasks?.length} adet review girdiniz.
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
                Score A(weight * %35)
              </th>
              <th scope="col" className="px-6 py-3">
                Score B(weight * %25)
              </th>
              <th scope="col" className="px-6 py-3">
                Score C(weight * %20)
              </th>
              <th scope="col" className="px-6 py-3">
                Score D(weight * %20)
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, i) => (
              <tr
                key={task.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i}
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
      </div>
    </div>
  );
};

export default Details;
