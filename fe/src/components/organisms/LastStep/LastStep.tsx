import Label from "@atoms/Label/Label";
import NextButton from "@molecules/NextButton/NextButton";

type Props = {};

const LastStep = (props: Props) => {
  const {} = props;
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
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-3/6 mx-auto my-6">
        <NextButton content={"Next"} to="/success" />
      </div>
    </div>
  );
};

export default LastStep;
