import { Context } from "@context/Context";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const FourthStep = (props: Props) => {
  const {} = props;
  const { task, setTask } = useContext(Context);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(task.detailedComments) && task.detailedComments.length === 12
      ? task.detailedComments
      : Array(12).fill("")
  );

  const questionTexts = [
    "The similarity ratio of the paper should be lower than 30%.",
    "Title should reflect the relation of your paper to intelligence and fuzziness",
    "The objective and originality of the paper should be given in the introduction section",
    "The organization of the paper should be given in the last paragraph of the Introduction section",
    "The related references which are used within the text must be given in the references list.",
    "A literature review section should be included",
    "An application section should be illustrated",
    "Findings should be emphasized in the Conclusion Section",
    "Suggestions for future research should be added to the Conclusion section.",
    "The page number of the paper should be between 6 and 8 pages. Otherwise, you have to pay 20 EURO for each additional page more than 8 pages.",
    "The language of the paper should be carefully checked for instance",
    "For the full paper, the Springer template given on the INFUS2024 site should be used",
  ];

  useEffect(() => {
    if (selectedValues.every((value) => value !== "")) {
      setErrorText(undefined);
    } else {
      setErrorText("All questions must be answered.");
    }
  }, [selectedValues]);

  const handleRadioChange = (index: number, value: string) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
    setTask((prevTask) => ({
      ...prevTask,
      detailedComments: newSelectedValues,
    }));
  };

  const handleNext = () => {
    if (selectedValues.every((value) => value !== "")) {
      navigate("/review/5");
    } else {
      setErrorText("All questions must be answered.");
    }
  };

  return (
    <div className="mt-4 max-w-screen-lg mx-auto p-7">
      <div className="flex flex-col items-center">
        <div className="overflow-x-auto">
          <table className="border-collapse border w-full">
            <thead>
              <tr>
                <th className="border p-2 font-semibold">
                  Detailed Comments to the Author/s :
                </th>
                <th className="border p-2 font-semibold">Yes</th>
                <th className="border p-2 font-semibold">No</th>
              </tr>
            </thead>
            <tbody>
              {questionTexts.map((text, index) => (
                <tr key={index}>
                  <td className="border p-2">{`${index + 1}. ${text}`}</td>
                  <td className="border p-2">
                    <input
                      type="radio"
                      id={`yes-${index}`}
                      value="Yes"
                      checked={selectedValues[index] === "Yes"}
                      onChange={() => handleRadioChange(index, "Yes")}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="radio"
                      id={`no-${index}`}
                      value="No"
                      checked={selectedValues[index] === "No"}
                      onChange={() => handleRadioChange(index, "No")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {errorText && (
        <p className="flex items-center justify-end w-full mx-auto my-6 text-red-500 mt-4">
          {errorText}
        </p>
      )}
      <div className="flex items-center justify-end w-full mx-auto my-6">
        <button
          type="submit"
          disabled={selectedValues.some((value) => value === "")}
          onClick={handleNext}
          className={`flex items-center rounded-lg p-2 text-white ${
            selectedValues.every((value) => value !== "")
              ? "bg-indigo-600"
              : "bg-gray-400"
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

export default FourthStep;
