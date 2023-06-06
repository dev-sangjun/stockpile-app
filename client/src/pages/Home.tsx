import { FC } from "react";
import FavoriteStocks from "../components/FavoriteStocks";

const Home: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-4 gap-4 p-4">
      <div className="card bg-base-100 shadow-xl col-span-2 row-span-2"></div>
      <div className="card bg-base-100 shadow-xl"></div>
      <div className="card bg-base-100 shadow-xl"></div>
      <div className="card bg-base-100 shadow-xl col-span-3"></div>
      <div className="card bg-base-100 shadow-xl col-span-3">
        <FavoriteStocks />
      </div>
    </div>
  );
};

export default Home;
