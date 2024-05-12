export interface UserState {
  isLoggedIn: boolean;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export interface Task {
  id: number;
  title: string;
  scores: string;
  user_id: number;
}
