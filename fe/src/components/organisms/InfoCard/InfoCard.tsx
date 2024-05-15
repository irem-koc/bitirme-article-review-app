import { Context } from "@context/Context";
import { useContext } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const InfoCard = (props: Props) => {
  const {} = props;
  const path = useLocation();
  const currentStep = parseInt(path.pathname.split("/").pop()) || 1;
  const {} = useContext(Context);

  const steps = [
    { step: 1, label: "First", path: "/" },
    { step: 2, label: "Second", path: "/review/2" },
    { step: 3, label: "Third", path: "/review/3" },
    { step: 4, label: "Fourth", path: "/review/4" },
    {
      step: 5,
      label: "Last",
      path: "/review/5",
      icon: <IoCheckmarkDone className="w-6 h-6 ms-2 sm:ms-3 rtl:rotate-180" />,
    },
  ];

  return (
    <div className="w-full ">
      <ol className="flex flex-wrap gap-5 items-center justify-center w-full p-3 space-x-0  text-sm font-medium text-center text-gray-500 bg-white border-gray-200 rounded-lg shadow-sm sm:flex-nowrap sm:space-x-4 sm:space-y-0 sm:text-base dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 sm:p-4 rtl:space-x-reverse">
        {steps.map(({ step, label, path, icon }) => (
          <li
            key={step}
            className={`flex items-center ${
              step <= currentStep ? "active:text-black" : ""
            }`}
          >
            {step <= currentStep ? (
              <Link
                to={path}
                className={`flex items-center ${
                  step === currentStep ? "text-blue-600 dark:text-blue-500" : ""
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                    step === currentStep
                      ? "text-blue-600 dark:text-blue-500 border-blue-600"
                      : "dark:border-gray-400"
                  }`}
                >
                  {step}
                </span>
                {label}
                <span className="hidden sm:inline-flex sm:ms-2">Step</span>
                {icon ? (
                  icon
                ) : (
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
                )}
              </Link>
            ) : (
              <div className="flex items-center text-gray-400">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full dark:border-gray-400">
                  {step}
                </span>
                {label}
                <span className="hidden sm:inline-flex sm:ms-2">Step</span>
                {icon ? (
                  icon
                ) : (
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
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InfoCard;
