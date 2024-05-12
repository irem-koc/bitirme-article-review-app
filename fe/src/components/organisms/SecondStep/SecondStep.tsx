import NextButton from "@molecules/NextButton/NextButton";
import { useState } from "react";

type Props = {};
const RadioOption = ({ id, name, value, label, checked, onChange }) => (
  <input
    type="radio"
    id={id}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
  />
);
const SecondStep = (props: Props) => {
  const {} = props;
  const data = [
    "A. Originality, novelty and significance of results (weight 35%)?*",
    "B.	Technical quality of the work (weight 25%)?*",
    "C.	Comprehensibility and presentation of the paper (weight 20%)?*",
    "D.	What is the overall impression given by the paper (weight 20%)?*",
  ];
  const [selectedValues, setSelectedValues] = useState(
    Array(data.length).fill("")
  );
  console.log(selectedValues);

  const handleRadioChange = (index, value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = value;
    setSelectedValues(newSelectedValues);
  };
  return (
    <div>
      {data.map((question, index) => (
        <div key={index} className="flex flex-col items-center mt-4">
          <table className="border-collapse border w-3/6">
            <thead>
              <tr>
                <th className="border p-2" colSpan={2}>
                  {question}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <RadioOption
                    id="inadequate"
                    name={`evaluation${index}`}
                    value="1"
                    label="Inadequate"
                    checked={selectedValues[index] === "1"}
                    onChange={() => handleRadioChange(index, "1")}
                  />
                  <label htmlFor="inadequate">1</label>
                </td>
                <td className="border p-2">Inadequate</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <RadioOption
                    id="inadequate"
                    name={`evaluation${index}`}
                    value="1"
                    label="Inadequate"
                    checked={selectedValues[index] === "5"}
                    onChange={() => handleRadioChange(index, "5")}
                  />
                  <label htmlFor="adequate">5</label>
                </td>
                <td className="border p-2">Adequate</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <RadioOption
                    id="inadequate"
                    name={`evaluation${index}`}
                    value="1"
                    label="Inadequate"
                    checked={selectedValues[index] === "7"}
                    onChange={() => handleRadioChange(index, "7")}
                  />
                  <label htmlFor="good">7</label>
                </td>
                <td className="border p-2">Good</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <RadioOption
                    id="inadequate"
                    name={`evaluation${index}`}
                    value="1"
                    label="Inadequate"
                    checked={selectedValues[index] === "9"}
                    onChange={() => handleRadioChange(index, "9")}
                  />
                  <label htmlFor="excellent">9</label>
                </td>
                <td className="border p-2">Excellent</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <NextButton content={"Next"} to="/review/3" />
      </div>
    </div>
  );
};

export default SecondStep;
