import Label from "@atoms/Label/Label";
import Text from "@atoms/Text/Text";
import { Context } from "@context/Context";
import login from "@services/login";
import verifySession from "@services/verifySession";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const {} = props;
  const { setUserr, userr } = useContext(Context);

  const [user, setUser] = useState({ ...userr, email: "", password: "" });
  const [errorText, setErrorText] = useState<string | undefined>("");
  const [emailError, setEmailError] = useState<string | undefined>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      verifySession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setErrorText("");
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "email") {
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError("Geçerli bir e-posta adresi girin.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleLogin = async () => {
    try {
      if (localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt");
      }
      console.log(user, "is user");

      const res = await login(user);

      if (res.error) {
        if (res.error.status === 422) {
          setErrorText("Girmiş olduğunuz bilgiler yanlıştır.");
        }
      } else {
        localStorage.setItem("jwt", res);

        const userData = {
          firstName: res.firstName, // assuming these are from the login response
          lastName: res.lastName, // assuming these are from the login response
          email: user.email,
        };

        setUserr((prevUser) => ({
          ...prevUser,
          isUserLoggedIn: true,
          userData: userData,
        }));

        localStorage.setItem(
          "userdata",
          JSON.stringify({
            isUserLoggedIn: true,
            userData: userData,
          })
        );

        navigate("/welcome");
      }
    } catch (error) {
      setErrorText(error.message);
    } finally {
      setUser({ email: "", password: "" });
    }
  };

  const location = useLocation();
  const isFormInvalid = !user.email || !user.password || emailError;

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-md mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      {/* header */}
      <div className="header flex flex-col items-center justify-center mb-5">
        <Text content={"Merhaba,"} style={["text-lg"]} />
        <Text
          content={"ARA’ya giriş yap veya hesap oluştur, yorumları kaçırma!"}
          style={["text-md"]}
        />
      </div>
      <div className="flex w-full justify-center items-end">
        <Link
          to="/login"
          className={`${
            location.pathname !== "/signup"
              ? "border border-b-0"
              : "text-gray-300 border-b"
          } flex text-indigo-600 justify-center items-center w-full rounded-xs px-3 py-2 text-lg font-medium`}
          aria-current="page"
        >
          Giriş Yap
        </Link>
        <Link
          to="/signup"
          className={`${
            location.pathname !== "/login"
              ? "border"
              : "text-black border-b bg-gray-100"
          } flex justify-center items-center w-full rounded-xs px-3 py-2 text-lg font-medium`}
          aria-current="page"
        >
          Üye Ol
        </Link>
      </div>
      <div className="login-section border border-t-0 w-full p-6 sm:p-10">
        <div className="mb-4">
          <Label
            content={"E-Posta"}
            htmlFor={"email"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            type={"email"}
            value={user.email}
            name={"email"}
            id={"email"}
            className={`border mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full rounded-md bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && <p className="text-red-500 error">{emailError}</p>}
        </div>
        <div className="mb-4">
          <Label
            content={"Şifre"}
            htmlFor={"password"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={user.password}
            name={"password"}
            type={"password"}
            id={"password"}
            className={
              "border w-full mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md flex-1 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            }
          />
        </div>
        {errorText ? <p className="text-red-500 error">{errorText}</p> : null}
        <div>
          <button
            type="submit"
            disabled={isFormInvalid}
            onClick={handleLogin}
            className={`w-full rounded-md text-white text-[14px] font-semibold text-center py-2 px-3 ${
              isFormInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            GİRİŞ YAP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
