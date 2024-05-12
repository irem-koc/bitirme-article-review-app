import InfoCard from "@organisms/InfoCard/InfoCard";

import { Outlet } from "react-router-dom";
type Props = {};

const Home = (props: Props) => {
  const {} = props;
  return (
    <div>
      <InfoCard />
      <Outlet />
    </div>
  );
};

export default Home;
