import { useTranslation } from "react-i18next";
import emojis from "./emoji.constants";

export const useFallbackMessages = () => {
  const { t } = useTranslation();
  return {
    portfolios: `${t("Let's add your first portfolio to get started.")} ${
      emojis.party
    }`,
    portfolioValues: `${t("Go to Portfolios and add your first portfolio!")} ${
      emojis.wink
    }`,
    investments: `${t("Hmm... There is no investment to display.")} ${
      emojis.ponder
    }`,
    favoriteStocks: `${t("You don't have any favorite stock yet?")} ${
      emojis.sweat
    }`,
  };
};
