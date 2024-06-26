import { ReactNode, createContext, useEffect, useState } from "react";

type UserType = {
  isUserLoggedIn: boolean;
  userData: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    rol: string | null;
  };
};

type TaskType = {
  title: string;
  scores: string[];
  review: string;
  overallAssessment: string;
  detailedComments: string[];
  articleId: string;
  userId: string;
};

type ContextType = {
  userr: UserType;
  setUserr: React.Dispatch<React.SetStateAction<UserType>>;
  task: TaskType;
  setTask: React.Dispatch<React.SetStateAction<TaskType>>;
};

export const Context = createContext<ContextType>({
  userr: {
    isUserLoggedIn: false,
    userData: { firstName: null, lastName: null, email: null, rol: null },
  },
  setUserr: () => {},
  task: {
    title: "",
    scores: [],
    review: "",
    overallAssessment: "",
    detailedComments: [],
    articleId: "",
    userId: "",
  },
  setTask: () => {},
});

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [userr, setUserr] = useState<UserType>({
    isUserLoggedIn: false,
    userData: { firstName: null, lastName: null, email: null, rol: null },
  });

  const [task, setTask] = useState<TaskType>({
    title: "",
    scores: [],
    overallAssessment: "",
    detailedComments: [],
    review: "",
    articleId: "",
    userId: "",
  });
  const [tasks, setTasks] = useState<TaskType[]>([]);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const loggedIn = jwt ? true : false;
    const userDataStr = localStorage.getItem("userdata");
    if (userDataStr) {
      const userDataObj = JSON.parse(userDataStr);
      const { firstName, lastName, email, rol } = userDataObj;
      setUserr({
        isUserLoggedIn: loggedIn,
        userData: { firstName, lastName, email, rol },
      });
    } else {
      setUserr({
        isUserLoggedIn: loggedIn,
        userData: { firstName: null, lastName: null, email: null, rol: null },
      });
    }
  }, []);

  const values = { userr, setUserr, task, setTask, tasks, setTasks };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ContextProvider;
