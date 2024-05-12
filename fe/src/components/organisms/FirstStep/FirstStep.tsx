import Label from "@atoms/Label/Label";
import NextButton from "@molecules/NextButton/NextButton";

type Props = {};

const FirstStep = (props: Props) => {
  const {} = props;
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="items-start w-1/2 mb-5">
        <Label
          content={"Paper ID"}
          htmlFor={"paperId"}
          style={["text-sm font-medium leading-6 text-gray-900"]}
        />
        <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
          <input
            type="text"
            name="paperId"
            id="paperId"
            autoComplete="paperId"
            className="w-full  outline-none flex-1 border-0 bg-transparent  p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="ex. 25"
          />
        </div>
      </div>
      <div className="items-start w-1/2 mb-5">
        <Label
          content={"Title"}
          htmlFor={"title"}
          style={["text-sm font-medium leading-6 text-gray-900"]}
        />
        <div className="mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="title"
            className="block outline-none flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 sm:max-w-md"
            placeholder="janesmith"
          />
        </div>
      </div>
      <div className="flex items-end justify-end w-1/2">
        <NextButton content={"Next"} to="/review/2" />
      </div>
    </div>
  );
};

export default FirstStep;
