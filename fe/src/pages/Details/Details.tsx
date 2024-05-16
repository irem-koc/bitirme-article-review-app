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
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Article Filtrele:
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <span>{filteredTasks.length} adet inceleme bulundu</span>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 sm:divide-y-0 sm:table">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 sm:w-1/6">Article</th>
              <th className="px-6 py-3 sm:w-1/6">Kullanıcı</th>
              <th className="px-6 py-3 sm:w-1/6">Skor A (ağırlık * %35)</th>
              <th className="px-6 py-3 sm:w-1/6">Skor B (ağırlık * %25)</th>
              <th className="px-6 py-3 sm:w-1/6">Skor C (ağırlık * %20)</th>
              <th className="px-6 py-3 sm:w-1/6">Skor D (ağırlık * %20)</th>
              <th className="px-6 py-3 sm:w-1/6">Ağırlık</th>
              <th className="px-6 py-3 sm:w-1/6">Ortalama Ağırlık</th>
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
                        <tr key={task.id}>
                          <td className="px-6 py-4 sm:w-1/6">
                            Id: {articleId}
                          </td>
                          <td className="px-6 py-4 sm:w-1/6">
                            {task.user.firstName}
                          </td>
                          {task.scores.slice(0, 4).map((score, index) => (
                            <td key={index} className="px-6 py-4 sm:w-1/6">
                              {score}
                            </td>
                          ))}
                          {Array(4 - task.scores.length)
                            .fill("")
                            .map((_, index) => (
                              <td
                                key={index + task.scores.length}
                                className="px-6 py-4 sm:w-1/6"
                              >
                                -
                              </td>
                            ))}
                          <td className="px-6 py-4 sm:w-1/6">
                            {calculateTotalWeight(task.scores).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    <tr className="border-t">
                      <th className="px-6 py-4 sm:w-1/6">
                        Article Id: {articleId}
                      </th>
                      <td className="px-6 py-4 sm:w-1/6" colSpan={5}></td>
                      <td className="px-6 py-4 sm:w-1/6"></td>
                      <td className="px-6 py-4 sm:w-1/6">
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
