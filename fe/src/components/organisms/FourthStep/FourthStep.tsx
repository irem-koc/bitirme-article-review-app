import NextButton from "@molecules/NextButton/NextButton";

type Props = {};

const FourthStep = (props: Props) => {
  const {} = props;
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
            <tr>
              <td className="border p-2">
                1. The similarity ratio of the paper should be lower than 30%.
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                2. Title should reflect the relation of your paper to
                intelligence and fuzziness
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                3. The objective and originality of the paper should be given in
                the introduction section
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                4. The organization of the paper should be given in the last
                paragraph of the Introduction section
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                5. The related references which are used within the text must be
                given in the references list.
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                6. A literature review section should be included
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                7. An application section should be illustrated
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                8. Findings should be emphasized in the Conclusion Section
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                9. Suggestions for future research should be added to the
                Conclusion section.
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                10. The page number of the paper should be between 6 and 8
                pages. Otherwise, you have to pay 20 EURO for each additional
                page more than 8 pages.
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                11. The language of the paper should be carefully checked for
                instance
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">Yes</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">No</label>
              </td>
            </tr>
            <tr>
              <td className="border p-2">
                12. For the full paper, the Springer template given on the
                INFUS2024 site should be used
              </td>
              <td className="border p-2">
                <input type="radio" id="adequate" value={1} />
                <label htmlFor="inadequate">1</label>
              </td>
              <td className="border p-2">
                <input type="radio" id="inadequate" value={1} />
                <label htmlFor="inadequate">1</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <NextButton content={"Next"} to="/review/5" />
      </div>
    </div>
  );
};

export default FourthStep;
