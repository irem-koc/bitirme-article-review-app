import { Context } from "@context/Context";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const RadioOption = ({ id, name, value, label, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio"
      style={{ cursor: "pointer" }}
    />
    <span>{label}</span>
  </label>
);

const SecondStep = (props: Props) => {
  const {} = props;
  const { task, setTask } = useContext(Context);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const data = [
    "A. Originality, novelty and significance of results (weight 35%)?*",
    "B. Technical quality of the work (weight 25%)?*",
    "C. Comprehensibility and presentation of the paper (weight 20%)?*",
    "D. What is the overall impression given by the paper (weight 20%)?*",
  ];
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array(data.length).fill("")
  );

  useEffect(() => {
    if (task && task.scores && task.scores.length === data.length) {
      setSelectedValues(task.scores);
    } else {
      setSelectedValues(Array(data.length).fill(""));
    }
  }, [task]);

  useEffect(() => {
    const allAnswered =
      selectedValues.filter((value) => value !== "").length === data.length;
    setErrorText(allAnswered ? undefined : "All questions must be answered.");
  }, [selectedValues]);

  const handleRadioChange = (index, value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
    setTask({ ...task, scores: newSelectedValues });
  };

  const handleNext = () => {
    if (selectedValues.filter((value) => value !== "").length === data.length) {
      navigate("/review/3");
    } else {
      setErrorText("All questions must be answered.");
    }
  };

  return (
    <div className="mt-4 max-w-screen-lg mx-auto p-7">
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2 font-semibold">Questions</th>
            <th className="border p-2 font-semibold">Response</th>
          </tr>
        </thead>
        <tbody>
          {data.map((question, index) => (
            <tr key={index}>
              <td className="border p-2">{question}</td>
              <td className="border p-2">
                <div className="flex flex-col space-y-2">
                  {["1", "5", "7", "9"].map((value) => (
                    <RadioOption
                      key={`${index}-${value}`}
                      id={`${value}-${index}`}
                      name={`evaluation${index}`}
                      value={value}
                      label={value}
                      checked={selectedValues[index] === value}
                      onChange={() => handleRadioChange(index, value)}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorText && (
        <p className="flex items-center justify-end w-full mx-auto my-6 text-red-500 mt-4">
          {errorText}
        </p>
      )}
      <div className="flex items-center justify-end w-full mx-auto my-6">
        <button
          type="submit"
          disabled={
            selectedValues.filter((value) => value !== "").length !==
            data.length
          }
          onClick={handleNext}
          className={`flex items-center rounded-lg p-2 text-white ${
            selectedValues.filter((value) => value !== "").length !==
            data.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 cursor-pointer"
          }`}
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

export default SecondStep;
