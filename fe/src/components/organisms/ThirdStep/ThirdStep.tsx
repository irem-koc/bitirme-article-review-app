import { Context } from "@context/Context";
import { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type Props = {};

const ThirdStep = (props: Props) => {
  const {} = props;
  const { task, setTask } = useContext(Context);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    task.overallAssessment
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue !== task.overallAssessment) {
      selectedValue && setTask({ ...task, overallAssessment: selectedValue });
    }
  }, [selectedValue]);

  const handleNext = () => {
    if (selectedValue) {
      navigate("/review/4");
    } else {
      setErrorText("Please select an option.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-4">
        <table className="border-collapse border w-3/6">
          <thead>
            <tr>
              <th className="border p-2" colSpan={2}>
                Overall Assessment and Recommendation:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                <input
                  type="radio"
                  id="inadequate"
                  value="1"
                  checked={selectedValue === "1"}
                  onChange={() => handleRadioChange("1")}
                />
                <label htmlFor="inadequate">1</label>
              </td>
              <td className="border p-2">
                Very weak paper, strong recommendation to REJECT
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="radio"
                  id="adequate"
                  value="3"
                  checked={selectedValue === "3"}
                  onChange={() => handleRadioChange("3")}
                />
                <label htmlFor="adequate">3</label>
              </td>
              <td className="border p-2">
                Weak paper, recommendation to REJECT
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="radio"
                  id="good"
                  value="5"
                  checked={selectedValue === "5"}
                  onChange={() => handleRadioChange("5")}
                />
                <label htmlFor="good">5</label>
              </td>
              <td className="border p-2">
                Doubtful ACCEPT, suggest to accept only if there are clearly
                better votes by others
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="radio"
                  id="excellent"
                  value="7"
                  checked={selectedValue === "7"}
                  onChange={() => handleRadioChange("7")}
                />
                <label htmlFor="excellent">7</label>
              </td>
              <td className="border p-2">ACCEPT this very solid paper</td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="radio"
                  id="perfect"
                  value="9"
                  checked={selectedValue === "9"}
                  onChange={() => handleRadioChange("9")}
                />
                <label htmlFor="perfect">9</label>
              </td>
              <td className="border p-2">
                Strong recommendation to ACCEPT this paper
              </td>
            </tr>
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
          disabled={!selectedValue}
          onClick={handleNext}
          className={`flex items-center rounded-lg p-2 text-white ${
            !selectedValue ? "bg-gray-400" : "bg-indigo-600"
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

export default ThirdStep;
