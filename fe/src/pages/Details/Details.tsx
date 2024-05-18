import { Context } from "@context/Context";
import Nothing from "@pages/Nothing/Nothing";
import getAllAllReviews from "@services/getAllAllReviews";
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const { tasks, userr } = useContext(Context);
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();

  const handleLogin = async (email: string) => {
    try {
      setIsloading(true);
      const res = await getAllAllReviews();

      const userArticleIds = [...res]
        .filter((task) => task.user.email === email)
        .map((task) => task.articleId);
      console.log("userArticleIds", userArticleIds);
      const uniqueUserArticleIds = Array.from(new Set(userArticleIds));
      const userTasks = res.filter((task) =>
        uniqueUserArticleIds.includes(task.articleId)
      );
      console.log("userTasks", userTasks);
      setAllTasks(userTasks);
      setFilteredTasks(userTasks);
    } catch (error) {
      navigate("/login");
      setErrorText(error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (userr.userData.email) handleLogin(userr.userData.email);
  }, [userr.userData.email]);

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
  console.log(filteredTasks, " filteredTasks", allTasks, " allTasks");

  return (
    <div className="p-7">
      {errorText && <p className="error">{errorText}</p>}
      {!isLoading && (
        <>
          {filteredTasks.length > 0 && (
            <div className="mb-4 flex flex-col items-start">
              <label htmlFor="filter" className="m-2 ml-0">
                Filter article:
              </label>
              <div className="relative sm:w-1/2 max-sm:w-full">
                <input
                  type="text"
                  id="filter"
                  value={filter}
                  onChange={handleFilterChange}
                  placeholder="Enter article ID..."
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CiSearch strokeWidth="1.2" color="#2563EB" />
                </div>
              </div>
            </div>
          )}
          <div className="overflow-x-auto mt-4">
            {filteredTasks.length > 0 ? (
              <table className="w-full border text-sm text-left text-gray-500 dark:text-gray-400 divide-y divide-gray-200">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-3 sm:w-1/6 border">Article</th>
                    <th className="px-3 py-3 sm:w-1/6 border">User</th>
                    <th className="px-3 py-3 sm:w-1/6 border">
                      Score A (weight * 35%)
                    </th>
                    <th className="px-3 py-3 sm:w-1/6 border">
                      Score B (weight * 25%)
                    </th>
                    <th className="px-3 py-3 sm:w-1/6 border">
                      Score C (weight * 20%)
                    </th>
                    <th className="px-3 py-3 sm:w-1/6 border">
                      Score D (weight * 20%)
                    </th>
                    <th className="px-3 py-3 sm:w-1/6 border">Weight</th>
                    <th className="px-3 py-3 sm:w-1/6 border">
                      Average Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(calculateAverageWeightPerArticle()).map(
                    ([articleId, averageWeight]) => (
                      <React.Fragment key={articleId}>
                        {filteredTasks
                          .filter((task) => task.articleId === articleId)
                          .map((task, index) => (
                            <tr
                              className={`${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              } dark:${
                                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                              }`}
                              key={task.id}
                            >
                              <td className="px-3 py-3 sm:w-1/6 border"></td>
                              <td className="px-3 py-3 sm:w-1/6 border">
                                {task.user.firstName}
                              </td>
                              {task.scores.slice(0, 4).map((score, index) => (
                                <td
                                  key={index}
                                  className="px-3 py-3 sm:w-1/6 border"
                                >
                                  {score}
                                </td>
                              ))}
                              {Array(4 - task.scores.length)
                                .fill("")
                                .map((_, index) => (
                                  <td
                                    key={index + task.scores.length}
                                    className="px-3 py-3 sm:w-1/6 border"
                                  >
                                    -
                                  </td>
                                ))}
                              <td className="px-3 py-3 sm:w-1/6 border">
                                {calculateTotalWeight(task.scores).toFixed(2)}
                              </td>
                              <td className="px-3 py-3 sm:w-1/6 border"></td>
                            </tr>
                          ))}
                        <tr className="border-t odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                          <th className="px-3 py-3 sm:w-1/6 italic border">
                            Article Id: {articleId}
                          </th>
                          <td
                            className="px-3 py-3 sm:w-1/6 border"
                            colSpan={5}
                          ></td>
                          <td className="px-3 py-3 sm:w-1/6 border"></td>
                          <td className="px-3 py-3 sm:w-1/6 italic font-bold border">
                            {averageWeight.toFixed(2)}
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <Nothing />
              // <div>a</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
