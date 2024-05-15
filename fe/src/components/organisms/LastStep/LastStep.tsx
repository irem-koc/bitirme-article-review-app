import Label from "@atoms/Label/Label";
import { Context } from "@context/Context";
import addReview from "@services/addReview";
import { useContext, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const LastStep = (props: Props) => {
  const {} = props;
  const { task, setTask } = useContext(Context);
  const [errorText, setErrorText] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await addReview(task);
      navigate("/success");
      setTask({});
    } catch (err) {
      console.log("*********");
      console.log(task);

      setErrorText(err);
    } finally {
      // setTask({ title: "", body: "" });
    }
  };

  const isSubmitDisabled = !task.review || !task.review.trim();

  return (
    <div>
      <div className="flex flex-col items-center mt-4">
        <div className="items-start w-1/2 mb-5">
          <Label
            content={"Is there any other negative you would like to add?"}
            htmlFor={"review"}
            style={[""]}
          />
          <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
            <textarea
              rows={6}
              name="review"
              id="review"
              autoComplete="paperId"
              className="w-full  outline-none flex-1 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="ex. bla bla bla"
              value={task.review}
              onChange={(e) => setTask({ ...task, review: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className={`flex items-center rounded-lg p-2 text-white ${
            isSubmitDisabled ? "bg-gray-400" : "bg-indigo-600"
          }`}
          onMouseEnter={() => {
            if (isSubmitDisabled) {
              setErrorText(undefined);
            }
          }}
        >
          Next
          <span className="pl-1">
            <GrFormNextLink />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LastStep;
