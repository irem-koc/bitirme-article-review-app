import { ReactNode, createContext, useState } from "react";

type UserType = {
  isUserLoggedIn: boolean;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

type ContextType = {
  userr: UserType;
  setUserr: React.Dispatch<React.SetStateAction<UserType>>;
};

export const Context = createContext<ContextType>({
  userr: {
    isUserLoggedIn: false,
    userData: { firstName: "", lastName: "", email: "" },
  },
  setUserr: () => {},
});

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [userr, setUserr] = useState<UserType>({
    isUserLoggedIn: false,
    userData: { firstName: "", lastName: "", email: "" },
  });

  const values = { userr, setUserr };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export default ContextProvider;
