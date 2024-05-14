import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

type Props = {
  content: string;
  to: string;
  onclick: () => void;
};

const NextButton = (props: Props) => {
  const { content, to } = props;
  return (
    <Link to={to}>
      <button
        onClick={() => onclick()}
        className="flex items-center rounded-lg p-2 text-white bg-indigo-600 "
      >
        {content}
        <span className="pl-1">
          <GrFormNextLink />
        </span>
      </button>
    </Link>
  );
};

export default NextButton;
