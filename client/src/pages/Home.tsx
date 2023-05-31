import { FC, useEffect } from "react";

const Home: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
      <div className="card bg-base-100 shadow-xl col-span-2"></div>
      <div className="card bg-base-100 shadow-xl"></div>
      <div className="card bg-base-100 shadow-xl"></div>
    </div>
  );
};

export default Home;
