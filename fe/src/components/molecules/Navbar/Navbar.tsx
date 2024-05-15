import { Context } from "@context/Context";
import getUserData from "@services/getUserData";
import { useContext, useEffect, useState } from "react";
import { CiLogin, CiLogout, CiUser } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  // const { data: userData } = useGetUserDataQuery();
  const location = useLocation();
  const { userr, setUserr } = useContext(Context);
  const [errorText, setErrorText] = useState();

  const [user, setUser] = useState();
  const handleLogin = async () => {
    try {
      const res = await getUserData();
      setUserr({ isUserLoggedIn: true, userData: res });
    } catch (error) {
      setErrorText(error.message);
    }
  };
  const handleLogout = () => {
    localStorage.setItem("jwt", "");
    localStorage.setItem("userdata", "");
    setUserr({ ...userr, isUserLoggedIn: false });
  };
  useEffect(() => {
    handleLogin();
  }, [location.pathname]);
  return (
    <div>
      <nav className="bg-gradient-to-r from-indigo-600 to-gray-800 mb-5">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
              <div className="mx-4 flex items-center justify-center">
                <div className="flex flex-shrink-0 justify-center gap-1 items-center">
                  <span className="text-yellow-300 unique">ARA</span>
                  <img
                    title="ARA(Article Review App)"
                    className="h-15 w-10"
                    src="https://cdn-icons-png.freepik.com/512/5230/5230294.png"
                    alt="Your Company"
                  />
                </div>
                <div className="sm:ml-6 hidden md:flex">
                  <div className="space-x-4 flex items-center justify-center">
                    <Link
                      to="/"
                      className={`${
                        location.pathname !== "/details" &&
                        location.pathname !== "/login" &&
                        location.pathname !== "/signup"
                          ? "bg-transparent text-white border border-white"
                          : "text-gray-300"
                      } 
                  sm:hover:bg-indigo-900 flex items-center sm:hover:text-white rounded-md px-3 py-2 text-sm font-medium sm:active:bg-black sm:active:text-white ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
                      aria-current="page"
                    >
                      <span className="pr-2">
                        <HiOutlineHome />
                      </span>
                      Home
                    </Link>
                    <Link
                      to="/details"
                      className={`
                ${
                  location.pathname === "/details"
                    ? "bg-transparent text-white  border border-white"
                    : "text-gray-300"
                } 
                  sm:hover:bg-indigo-900 flex items-center sm:hover:text-white rounded-md px-3 py-2 text-sm font-medium sm:active:bg-black sm:active:text-white ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
                      aria-current="page"
                    >
                      <span className="pr-2">
                        <TbListDetails />
                      </span>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mx-4 flex items-center justify-center">
                {userr.userData.firstName ? (
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <span>
                        <CiUser fill="white" stroke="1.2" />
                      </span>
                      <p className="text-white">
                        Hello, {userr?.userData?.firstName}
                      </p>
                    </div>
                    <Link
                      to="/login"
                      className={`${
                        location.pathname === "/login" ||
                        location.pathname === "/signup"
                          ? "bg-transparent text-white border border-white"
                          : "text-gray-300"
                      } 
                  sm:hover:bg-indigo-900 flex items-center sm:hover:text-white rounded-md px-3 py-2 text-sm font-medium sm:active:bg-black sm:active:text-white ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
                      aria-current="page"
                    >
                      <span onClick={() => handleLogout()} className="pr-2">
                        <CiLogout stroke="1.2" />
                      </span>
                      Logout
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`${
                      location.pathname === "/login" ||
                      location.pathname === "/signup"
                        ? "bg-transparent text-white border border-white"
                        : "text-gray-300"
                    } 
                  sm:hover:bg-indigo-900 flex items-center sm:hover:text-white rounded-md px-3 py-2 text-sm font-medium sm:active:bg-black sm:active:text-white ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
                    aria-current="page"
                  >
                    <span className="pr-2">
                      <CiLogin />
                    </span>
                    Log in / Sign up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
