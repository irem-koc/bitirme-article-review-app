import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import Label from "@atoms/Label/Label";
import Text from "@atoms/Text/Text";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
  const {} = props;
  const location = useLocation();
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
            location.pathname != "/signup"
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
            location.pathname != "/login"
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
      <div className="flex-shrink-0 border border-t-0 w-full p-10">
        <div className="mb-2">
          <Label
            content={"E-Posta"}
            htmlFor={"eposta"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <Input
            type={"email"}
            id={"eposta"}
            style={[
              "border w-full rounded-sm flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
              "flex-shrink-0",
            ]}
          />
        </div>
        <div>
          <Label
            content={"Şifre"}
            htmlFor={"password"}
            style={["text-xs font-medium leading-6 text-gray-900"]}
          />
          <Input
            type={"password"}
            id={"password"}
            style={[
              "border w-full rounded-sm flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
              "flex-shrink-0",
            ]}
          />
          <p className="text-[12px] text-gray-600 mb-2">
            Şifreniz en az 10 karakter olmalı. 1 büyük harf, 1 küçük harf ve
            rakam içermelidir.
          </p>
        </div>
        <div>
          <Label
            content={"Cinsiyet (Opsiyonel)"}
            htmlFor={"password"}
            style={["text-[15px] font-normal text-gray-900"]}
          />
          <div className="flex mb-2">
            <Button
              style={[
                "w-1/2 border rounded-sm text-gray-600 text-[14px] font-semibold text-center bg-gray-100 py-2 px-3",
              ]}
              content={"Kadın"}
            />
            <Button
              style={[
                "w-1/2 border rounded-sm text-gray-600 text-[14px] font-semibold text-center bg-gray-100 py-2 px-3",
              ]}
              content={"Erkek"}
            />
          </div>
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
        <div>
          <Button
            style={[
              "w-full rounded-md text-white text-[14px] font-semibold text-center bg-indigo-800 py-2 px-3",
            ]}
            content={"ÜYE OL"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
