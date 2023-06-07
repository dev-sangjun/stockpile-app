import { FC } from "react";
import FavoriteStocks from "../components/FavoriteStocks";

const Home: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-4 md:grid-rows-3 gap-4 p-4">
      <div className="card bg-base-100 shadow-xl col-span-3 md:col-span-2 row-span-2 md:row-span-2"></div>
      <div className="card bg-base-100 shadow-xl col-span-3 md:col-span-1"></div>
      <div className="card bg-base-100 shadow-xl col-span-3 md:col-span-1"></div>
      <div className="col-span-3">
        <FavoriteStocks />
      </div>
    </div>
  );
};

export default Home;
