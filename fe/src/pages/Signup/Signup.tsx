import Button from "@atoms/Button/Button";
import Label from "@atoms/Label/Label";
import Text from "@atoms/Text/Text";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import register from "../../services/register";

type Props = {};

const Signup = (props: Props) => {
  const { userr, setUserr } = useContext(Context);
  const locate = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState<string | undefined>();

  const handleChange = (e) => {
    setErrorText(undefined);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const role = locate.pathname === "/signup" ? "ADMIN" : "VISITOR";
      const res = await register({ user, role });
      localStorage.setItem("jwt", res);

      setUserr({
        isUserLoggedIn: true,
        userData: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        })
      );

      if (res.error) {
        if (res.error.status === 400) {
          setErrorText("Hatalı giriş yaptınız.");
        } else if (res.error.status === 422) {
          setErrorText("Kullanıcı hatası");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorText(error.message);
    }
  };
  console.log();

  return (
    <div className="flex flex-shrink-0 flex-col justify-start items-center min-w-[380px] w-[500px] mx-auto">
      {/* header */}
      <div className="header flex flex-shrink-0 flex-col items-center justify-center mb-5">
        <Text content={"Merhaba,"} style={[]} />
        <Text
          content={"ARA’ya giriş yap veya hesap oluştur, yorumları kaçırma!"}
          style={["text-sm"]}
        />
      </div>
      <div className="flex w-full flex-shrink-0 justify-center items-end">
        <Link
          to="/login"
          className={`${
            locate.pathname != "/signup"
              ? "border"
              : "text-black bg-gray-100 border-b"
          } 
                   flex justify-center items-center w-full  rounded-xs px-3 py-2 text-sm font-medium ${
                     window.innerWidth <= 640 ? "hidden" : "block"
                   }`}
          aria-current="page"
        >
          Giriş Yap
        </Link>
        <Link
          to="/signup"
          className={`${
            locate.pathname != "/login"
              ? "border border-b-0"
              : "text-gray-300 border-b"
          } 
                  flex  text-indigo-600 justify-center items-center w-full rounded-xs px-3 py-2 text-sm font-medium ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
          aria-current="page"
        >
          Üye Ol
        </Link>
      </div>
      {/* login */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex-shrink-0 border border-t-0 w-full p-10"
      >
        <div className="mb-2">
          <Label
            content={"Ad"}
            htmlFor={"firstName"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={user.firstName}
            type={"text"}
            id={"firstName"}
            name="firstName"
            className={
              "border w-full rounded-sm flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            }
          />
        </div>
        <div className="mb-2">
          <Label
            content={"Soyad"}
            htmlFor={"lastName"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={user.lastName}
            type={"text"}
            id={"lastName"}
            name="lastName"
            className={
              "border w-full rounded-sm flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            }
          />
        </div>
        <div className="mb-2">
          <Label
            content={"E-Posta"}
            htmlFor={"email"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={user.email}
            type={"email"}
            id={"email"}
            name="email"
            className={
              "border w-full rounded-sm flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            }
          />
        </div>
        <div>
          <Label
            content={"Şifre"}
            htmlFor={"password"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={user.password}
            type={"password"}
            id={"password"}
            name="password"
            className={
              "border w-full rounded-sm bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 flex-shrink-0"
            }
          />
          <p className="text-[12px] text-gray-600 mb-2">
            Şifreniz en az 10 karakter olmalı. 1 büyük harf, 1 küçük harf ve
            rakam içermelidir.
          </p>
        </div>

        <div className="flex flex-shrink-0 gap-4 mb-2">
          {/* TODO: Make it from atom! */}
          <input
            className="w-4 border-4 border-gray-900"
            type="checkbox"
            name=""
            id="kvkk"
          />
          <div className="text-[13px] font-light text-gray-900">
            Kişisel verilerimin işlenmesine yönelik aydınlatma metnini okudum ve
            anladım
          </div>
        </div>
        {errorText ? <p className="error">{errorText}</p> : null}
        <div>
          <Button
            style={[
              "w-full rounded-md text-white text-[14px] font-semibold text-center bg-indigo-800 py-2 px-3",
              `${errorText} ? disabled:""`,
            ]}
            onclick={() => handleRegister()}
            content={"ÜYE OL"}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
