import Label from "@atoms/Label/Label";
import Text from "@atoms/Text/Text";
import { Context } from "@context/Context";
import register from "@services/register";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  const { setUserr } = useContext(Context);
  const locate = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rol: "",
  });

  const [errorText, setErrorText] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>("");
  const [passwordError, setPasswordError] = useState<string | undefined>("");
  const [isKvkkChecked, setIsKvkkChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (name === "password") {
      // Password validation
      const passwordPattern =
        /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).*)$/;
      if (!passwordPattern.test(value)) {
        setPasswordError(
          "Şifreniz en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, rol: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!isKvkkChecked) {
        setErrorText("KVKK onayı vermelisiniz.");
        return;
      }
      const role = "VISITOR";
      const res = await register({ user, role });

      if (res.error) {
        if (res.error.status === 400) {
          setErrorText("Hatalı giriş yaptınız.");
        } else if (res.error.status === 422) {
          setErrorText("Kullanıcı hatası");
        }
      } else {
        localStorage.setItem("jwt", res);

        setUserr({
          isUserLoggedIn: true,
          userData: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: user.rol,
          },
        });

        localStorage.setItem(
          "userdata",
          JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: user.rol,
          })
        );

        navigate("/welcome");
      }
    } catch (error) {
      setErrorText(error.message);
    }
  };
  console.log(user.password);

  const isFormInvalid =
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.password ||
    !isKvkkChecked ||
    !user.rol ||
    emailError ||
    passwordError;

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-md mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      {/* header */}
      <div className="header flex flex-col items-center justify-center mb-5">
        <Text content={"Merhaba,"} style={[""]} />
        <Text
          content={"ARA’ya giriş yap veya hesap oluştur, yorumları kaçırma!"}
          style={["text-sm"]}
        />
      </div>
      <div className="flex w-full justify-center items-end ">
        <Link
          to="/login"
          className={`${
            locate.pathname !== "/signup"
              ? "border"
              : "text-black bg-gray-100 border-b"
          } flex justify-center items-center w-full rounded-xs px-3 py-2 text-lg font-medium block`}
          aria-current="page"
        >
          Giriş Yap
        </Link>
        <Link
          to="/signup"
          className={`${
            locate.pathname !== "/login"
              ? "border border-b-0"
              : "text-gray-300 border-b"
          } flex text-indigo-600 justify-center items-center w-full rounded-xs px-3 py-2 text-lg font-medium block`}
          aria-current="page"
        >
          Üye Ol
        </Link>
      </div>
      {/* Signup form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-t-0 w-full p-6 sm:p-10"
      >
        <div className="mb-4">
          <Label
            content={"Ad"}
            htmlFor={"firstName"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={handleChange}
            value={user.firstName}
            type={"text"}
            id={"firstName"}
            name="firstName"
            className="border mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md w-full flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mb-4">
          <Label
            content={"Soyad"}
            htmlFor={"lastName"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={handleChange}
            value={user.lastName}
            type={"text"}
            id={"lastName"}
            name="lastName"
            className="border mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md w-full flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mb-4">
          <Label
            content={"E-Posta"}
            htmlFor={"email"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <input
            onChange={handleChange}
            value={user.email}
            type={"email"}
            id={"email"}
            name="email"
            className={`border mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md w-full flex-shrink-0 bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
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
            onChange={handleChange}
            value={user.password}
            type={"password"}
            id={"password"}
            name="password"
            className={`border mt-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md w-full bg-transparent p-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 flex-shrink-0 ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          {passwordError && (
            <p className="text-red-500 error">{passwordError}</p>
          )}
        </div>
        <div className="mb-4">
          <Label
            content={"Rol Seçimi"}
            htmlFor={"rol"}
            style={["text-sm font-medium leading-6 text-gray-900"]}
          />
          <div className="flex flex-col">
            <label className="flex items-center">
              <input
                type="radio"
                name="rol"
                value="admin"
                onChange={handleRoleChange}
                checked={user.rol === "admin"}
                className="w-4 h-4 border-gray-900"
              />
              <span className="ml-2 text-sm text-gray-900">Admin</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="rol"
                value="reviewer"
                onChange={handleRoleChange}
                checked={user.rol === "reviewer"}
                className="w-4 h-4 border-gray-900"
              />
              <span className="ml-2 text-sm text-gray-900">Reviewer</span>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <input
            type="checkbox"
            name="kvkk"
            id="kvkk"
            onChange={() => setIsKvkkChecked(!isKvkkChecked)}
            className="w-4 h-4 border-gray-900"
          />
          <div className="text-sm text-gray-900">
            Kişisel verilerimin işlenmesine yönelik aydınlatma metnini okudum ve
            anladım
          </div>
        </div>
        {errorText && <p className="text-red-500 error">{errorText}</p>}
        <div>
          <button
            type="submit"
            disabled={isFormInvalid}
            onClick={handleRegister}
            className={`w-full rounded-md text-white text-[14px] font-semibold text-center py-2 px-3 ${
              isFormInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            ÜYE OL
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
