import router from "@route/AppRouter.tsx";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ContextProvider from "../src/context/Context.tsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
