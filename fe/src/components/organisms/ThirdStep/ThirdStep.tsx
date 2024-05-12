import NextButton from "@molecules/NextButton/NextButton";

type Props = {};

const ThirdStep = (props: Props) => {
  const {} = props;
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
                  value={1}
                  label="Inadequate"
                />
                <label htmlFor="inadequate">1</label>
              </td>
              <td className="border p-2">
                Very weak paper, strong recommendation to REJECT
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <input type="radio" id="adequate" value={3} label="Adequate" />
                <label htmlFor="adequate">3</label>
              </td>
              <td className="border p-2">
                Weak paper, recommendation to REJECT
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                <input type="radio" id="good" value={5} label="Good" />
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
                  value={1}
                  label="Excellent"
                />
                <label htmlFor="excellent">7</label>
              </td>
              <td className="border p-2">ACCEPT this very solid paper</td>
            </tr>
            <tr>
              <td className="border p-2">
                <input type="radio" id="perfect" value={9} label="Perfect" />
                <label htmlFor="perfect">9</label>
              </td>
              <td className="border p-2">
                Strong recommendation to ACCEPT this paper
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <NextButton content="Next" to="/review/4" />
      </div>
    </div>
  );
};

export default ThirdStep;
