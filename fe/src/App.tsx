import Navbar from "@molecules/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <h1 className="">
      <Navbar />
      <Outlet />
    </h1>
  );
}
export default App;
// TODO: Tailwind, redux tk, tailwind, import alias, reusable components,
