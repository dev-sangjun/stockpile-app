import axios from "axios";
import { FC, useEffect } from "react";
import { DEV_SERVER_ENDPOINT, TEST_USER_ID } from "../dev/constants";

const Portfolios: FC = () => {
  useEffect(() => {
    const fetchPortfolios = async () => {
      const res = await axios.get(
        `${DEV_SERVER_ENDPOINT}/portfolios?userId=${TEST_USER_ID}`
      );
      console.log(res.data);
    };
    fetchPortfolios();
  }, []);
  return <div>Portfolios</div>;
};

export default Portfolios;
