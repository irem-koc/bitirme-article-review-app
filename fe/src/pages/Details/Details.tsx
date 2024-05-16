import { Context } from "@context/Context";
import getAllAllReviews from "@services/getAllAllReviews";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Details = (props: Props) => {
  const { tasks } = useContext(Context); // Assuming tasks are already filtered in context
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();

  const handleLogin = async () => {
    try {
      const res = await getAllAllReviews();
      setAllTasks(res);
      setFilteredTasks(res);
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

  const calculateAverageWeightPerArticle = () => {
    if (filteredTasks && filteredTasks.length > 0) {
      const articleWeights = {};
      for (const task of filteredTasks) {
        const key = task.articleId;
        const weight = calculateTotalWeight(task.scores);
        if (!articleWeights[key]) {
          articleWeights[key] = [weight];
        } else {
          articleWeights[key].push(weight);
        }
      }
      for (const articleId in articleWeights) {
        articleWeights[articleId] =
          articleWeights[articleId].reduce((a, b) => a + b) /
          articleWeights[articleId].length;
      }
      return articleWeights;
    }
    return {};
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    const filtered = allTasks.filter((task) =>
      task.articleId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="p-7">
      {errorText && <p className="error">{errorText}</p>}
      <div className="mb-4 flex items-center">
        <label htmlFor="filter" className="mr-2">
          Filter article:
        </label>
        <div className="relative">
          <input
            type="text"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Makale ID girin..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M13.293 14.707a1 1 0 01-1.414 1.414l-3-3a1 1 0 111.414-1.414l3 3a1 1 0 000 0zM11 6a5 5 0 100 10 5 5 0 000-10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 sm:divide-y-0 sm:table">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-3 sm:w-1/6">Article</th>
              <th className="px-3 py-3 sm:w-1/6">Kullanıcı</th>
              <th className="px-3 py-3 sm:w-1/6">Skor A (ağırlık * %35)</th>
              <th className="px-3 py-3 sm:w-1/6">Skor B (ağırlık * %25)</th>
              <th className="px-3 py-3 sm:w-1/6">Skor C (ağırlık * %20)</th>
              <th className="px-3 py-3 sm:w-1/6">Skor D (ağırlık * %20)</th>
              <th className="px-3 py-3 sm:w-1/6">Ağırlık</th>
              <th className="px-3 py-3 sm:w-1/6">Ortalama Ağırlık</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 &&
              Object.entries(calculateAverageWeightPerArticle()).map(
                ([articleId, averageWeight]) => (
                  <React.Fragment key={articleId}>
                    {filteredTasks
                      .filter((task) => task.articleId === articleId)
                      .map((task, index) => (
                        <tr
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                          key={task.id}
                        >
                          <td className="px-3 py-3 sm:w-1/6">
                            Id: {articleId}
                          </td>
                          <td className="px-3 py-3 sm:w-1/6">
                            {task.user.firstName}
                          </td>
                          {task.scores.slice(0, 4).map((score, index) => (
                            <td key={index} className="px-3 py-3 sm:w-1/6">
                              {score}
                            </td>
                          ))}
                          {Array(4 - task.scores.length)
                            .fill("")
                            .map((_, index) => (
                              <td
                                key={index + task.scores.length}
                                className="px-3 py-3 sm:w-1/6"
                              >
                                -
                              </td>
                            ))}
                          <td className="px-3 py-3 sm:w-1/6">
                            {calculateTotalWeight(task.scores).toFixed(2)}
                          </td>
                          <td className="px-3 py-3 sm:w-1/6"></td>
                        </tr>
                      ))}
                    <tr className="border-t odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                      <th className="px-3 py-3 sm:w-1/6">
                        Article Id: {articleId}
                      </th>
                      <td className="px-3 py-3 sm:w-1/6" colSpan={5}></td>
                      <td className="px-3 py-3 sm:w-1/6"></td>
                      <td className="px-3 py-3 sm:w-1/6">
                        {averageWeight.toFixed(2)}
                      </td>
                    </tr>
                  </React.Fragment>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
