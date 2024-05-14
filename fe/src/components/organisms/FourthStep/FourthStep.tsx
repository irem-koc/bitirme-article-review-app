import { Context } from "@context/Context"; // Context'i doğru dosyadan import et
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const FourthStep = (props: Props) => {
  const {} = props;
  const { task, setTask } = useContext(Context);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(task.detailedComments) && task.detailedComments.length === 12
      ? task.detailedComments
      : Array(12).fill("")
  );
  const [errorText, setErrorText] = useState<string | undefined>();
  const navigate = useNavigate();
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
    if (selectedValues.filter((value) => value !== "").length === 12) {
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
    if (selectedValues.filter((value) => value !== "").length === 12) {
      navigate("/review/5");
    } else {
      setErrorText("All questions must be answered.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-4">
        <table className="border-collapse border w-3/6">
          <thead>
            <tr>
              <th className="border p-2" colSpan={3}>
                Detailed Comments to the Author/s :
              </th>
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
                  <label htmlFor={`yes-${index}`}>Yes</label>
                </td>
                <td className="border p-2">
                  <input
                    type="radio"
                    id={`no-${index}`}
                    value="No"
                    checked={selectedValues[index] === "No"}
                    onChange={() => handleRadioChange(index, "No")}
                  />
                  <label htmlFor={`no-${index}`}>No</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errorText && (
        <p className="flex items-center justify-end w-3/6 mx-auto my-6 text-red-500 mt-4">
          {errorText}
        </p>
      )}
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <button
          type="submit"
          disabled={
            selectedValues.filter((value) => value !== "").length !== 12
          }
          onClick={handleNext}
          className={`flex items-center rounded-lg p-2 text-white ${
            selectedValues.filter((value) => value !== "").length !== 12
              ? "bg-gray-400"
              : "bg-indigo-600"
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
