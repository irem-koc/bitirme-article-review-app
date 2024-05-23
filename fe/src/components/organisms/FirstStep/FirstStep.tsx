import Label from "@atoms/Label/Label";
import { Context } from "@context/Context";
import getAllReviews from "@services/getAllReviews";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const FirstStep = (props: Props) => {
  const {} = props;
  const { userr, task, setTask } = useContext(Context);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const [isDisabled, setIsDisabled] = useState(true);
  console.log(userr, " userr");

  useEffect(() => {
    if (!localStorage.getItem("userdata") || !userr.userData.email) {
      console.log("burası");
      navigate("/login");
      console.log();
    }
  }, [userr, navigate]);

  useEffect(() => {
    const checkDuplicateArticleId = async () => {
      try {
        const userTasks = await getAllReviews(); // Kullanıcıya ait tüm görevleri al
        const hasDuplicate = userTasks.some(
          (t) => t.articleId === task.articleId
        );
        setIsDisabled(hasDuplicate || !task.title || !task.articleId);
        setErrorText(
          hasDuplicate
            ? "Please enter a different articleId!"
            : !task.title || !task.articleId
            ? "Please fill out the form correctly!"
            : undefined
        );
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    checkDuplicateArticleId();
  }, [task.title, task.articleId]);

  const handleChange = (e) => {
    setErrorText(undefined);
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      navigate("/review/2");
    } else {
      setErrorText("Please fill out the form correctly!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-md p-10 pt-5" onSubmit={handleNext}>
        <div className="items-start mb-5">
          <Label
            content="Article ID"
            htmlFor="articleId"
            style={["text-md font-semibold leading-6 text-gray-900"]}
          />
          <div className="my-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              onChange={handleChange}
              value={task.articleId}
              type="text"
              id="articleId"
              name="articleId"
              autoComplete="articleId"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              placeholder="Enter articleId"
              aria-describedby="articleId-error"
              aria-invalid={!!errorText}
            />
          </div>
          <Label
            content="Title"
            htmlFor="title"
            style={["text-md font-semibold leading-6 text-gray-900"]}
          />
          <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              onChange={handleChange}
              value={task.title}
              type="text"
              id="title"
              name="title"
              autoComplete="title"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              placeholder="Enter title"
              aria-describedby="title-error"
              aria-invalid={!!errorText}
            />
          </div>
          {errorText && (
            <p id="title-error" className="error text-red-500">
              {errorText}
            </p>
          )}
        </div>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className={`flex items-center rounded-lg p-2 text-white ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 cursor-pointer"
            }`}
            title={
              isDisabled
                ? "Please enter a different articleId or fill out the form correctly to proceed"
                : "Continue to next step"
            }
          >
            Next
            <span className="pl-1">
              <GrFormNextLink />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstStep;
