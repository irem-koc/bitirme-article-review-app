import { IoCheckmarkDone } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const InfoCard = (props: Props) => {
  const {} = props;
  const path = useLocation();
  return (
    <div>
      <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <Link to="/">
          <li
            className={`flex items-center active:text-black ${
              path.pathname === "/" ? "text-blue-600 dark:text-blue-500" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-gray-400 ${
                path.pathname === "/"
                  ? "text-blue-600 dark:text-blue-500 border-blue-600 "
                  : ""
              }`}
            >
              1
            </span>
            First <span className="hidden sm:inline-flex sm:ms-2">Step</span>
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
        </Link>
        <Link to="/review/2">
          <li
            className={`flex items-center active:text-black ${
              path.pathname.endsWith("2")
                ? "text-blue-600 dark:text-blue-500"
                : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-gray-400 ${
                path.pathname.endsWith("2")
                  ? "text-blue-600 dark:text-blue-500 border-blue-600 "
                  : ""
              }`}
            >
              2
            </span>
            Second <span className="hidden sm:inline-flex sm:ms-2">Step</span>
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
        </Link>
        <Link to="/review/3">
          <li
            className={`flex items-center active:text-black ${
              path.pathname.endsWith("3")
                ? "text-blue-600 dark:text-blue-500"
                : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-gray-400 ${
                path.pathname.endsWith("3")
                  ? "text-blue-600 dark:text-blue-500 border-blue-600 "
                  : ""
              }`}
            >
              3
            </span>
            Third<span className="hidden sm:inline-flex sm:ms-2">Step</span>
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
        </Link>
        <Link to="/review/4">
          <li
            className={`flex items-center active:text-black ${
              path.pathname.endsWith("4")
                ? "text-blue-600 dark:text-blue-500"
                : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-gray-400 ${
                path.pathname.endsWith("4")
                  ? "text-blue-600 dark:text-blue-500 border-blue-600 "
                  : ""
              }`}
            >
              3
            </span>
            Fourth<span className="hidden sm:inline-flex sm:ms-2">Step</span>
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
        </Link>
        <Link to="/review/5">
          <li
            className={`flex items-center active:text-black ${
              path.pathname.endsWith("5")
                ? "text-blue-600 dark:text-blue-500"
                : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 dark:border-gray-400 ${
                path.pathname.endsWith("5")
                  ? "text-blue-600 dark:text-blue-500 border-blue-600 "
                  : ""
              }`}
            >
              4
            </span>
            Last
            <IoCheckmarkDone className="w-6 h-6 ms-2 sm:ms-3 rtl:rotate-180" />
          </li>
        </Link>
      </ol>
    </div>
  );
};

export default InfoCard;
