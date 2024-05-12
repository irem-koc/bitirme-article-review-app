import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import Label from "@atoms/Label/Label";
import Text from "@atoms/Text/Text";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const {} = props;
  const location = useLocation();
  return (
    <div className="flex flex-col justify-start items-center min-w-[380px] w-[500px] mx-auto">
      {/* header */}
      <div className="header flex flex-col items-center justify-center mb-5">
        <Text content={"Merhaba,"} style={[]} />
        <Text
          content={"ARA’ya giriş yap veya hesap oluştur, yorumları kaçırma!"}
          style={["text-sm"]}
        />
      </div>
      <div className="flex w-full justify-center items-end">
        <Link
          to="/login"
          className={`${
            location.pathname != "/signup"
              ? "border border-b-0"
              : "text-gray-300 border-b"
          } 
                  flex text-indigo-600 justify-center items-center w-full  rounded-xs px-3 py-2 text-sm font-medium${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
          aria-current="page"
        >
          Giriş Yap
        </Link>
        <Link
          to="/signup"
          className={`${
            location.pathname != "/login"
              ? "border"
              : "text-black border-b bg-gray-100"
          } 
                  flex justify-center items-center w-full  rounded-xs px-3 py-2 text-sm font-medium ${
                    window.innerWidth <= 640 ? "hidden" : "block"
                  }`}
          aria-current="page"
        >
          Üye Ol
        </Link>
      </div>
      <div className="login-section border border-t-0 w-full p-10">
        <div className="mb-4">
          <Label
            content={"E-Posta"}
            htmlFor={"eposta"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <Input
            type={"email"}
            id={"eposta"}
            style={[
              "border w-full rounded-sm bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ",
              "flex-shrink-0",
            ]}
          />
        </div>
        <div className="mb-4">
          <Label
            content={"Şifre"}
            htmlFor={"password"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <Input
            type={"password"}
            id={"password"}
            style={[
              "border w-full  rounded-sm flex-1 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
              "flex-shrink-0",
            ]}
          />
        </div>
        <div>
          <Button
            style={[
              "w-full rounded-md text-white text-[14px] font-semibold text-center bg-indigo-800 py-2 px-3",
            ]}
            content={"GİRİŞ YAP"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
