import Label from "@atoms/Label/Label";
import { Context } from "@context/Context";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const FirstStep = (props: Props) => {
  const {} = props;
  const { userr, task, setTask, loggedIn } = useContext(Context); // loggedIn değerini ekledik
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!userr.isUserLoggedIn) {
      navigate("/login");
    }
  }, [userr.isUserLoggedIn, navigate]);

  useEffect(() => {
    setIsDisabled(!task.title || task.title.trim().length === 0);
  }, [task.title]);

  const handleChange = (e) => {
    setErrorText(undefined);
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (task.title && task.title.trim().length > 0) {
      navigate("/review/2");
    } else {
      setErrorText("Title cannot be empty!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <form className="w-1/2" onSubmit={handleNext}>
        <div className="items-start mb-5">
          <Label
            content="Title"
            htmlFor="title"
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              onChange={handleChange}
              value={task.title}
              type="text"
              id="title"
              name="title"
              autoComplete="title"
              className="block outline-none flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 sm:max-w-md"
              placeholder="Enter title"
            />
          </div>
        </div>
        {errorText && <p className="error text-red-500">{errorText}</p>}
        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className={`flex items-center rounded-lg p-2 text-white ${
              isDisabled ? "bg-gray-400" : "bg-indigo-600"
            }`}
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
