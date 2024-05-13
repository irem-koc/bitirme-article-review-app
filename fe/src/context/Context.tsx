import { ReactNode, createContext, useEffect, useState } from "react";

type UserType = {
  isUserLoggedIn: boolean;
  userData: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
};

type ContextType = {
  userr: UserType;
  setUserr: React.Dispatch<React.SetStateAction<UserType>>;
};

export const Context = createContext<ContextType>({
  userr: {
    isUserLoggedIn: false,
    userData: { firstName: null, lastName: null, email: null },
  },
  setUserr: () => {},
});

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [userr, setUserr] = useState<UserType>({
    isUserLoggedIn: false,
    userData: { firstName: null, lastName: null, email: null },
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    const userDataStr = localStorage.getItem("userdata");
    if (userDataStr) {
      const userDataObj = JSON.parse(userDataStr);
      const { firstName, lastName, email } = userDataObj;
      setUserr({
        isUserLoggedIn: loggedIn,
        userData: { firstName, lastName, email },
      });
    } else {
      setUserr({
        isUserLoggedIn: loggedIn,
        userData: { firstName: null, lastName: null, email: null },
      });
    }
  }, []);

  const values = { userr, setUserr };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ContextProvider;
