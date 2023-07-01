import { FC, PropsWithChildren } from "react";
import useDispatchActions from "../hooks/useDispatchActions";
import { useTranslation } from "react-i18next";
import useNotify from "../hooks/useNotify";
import emojis from "../constants/emoji.constants";
import PullToRefresh from "react-simple-pull-to-refresh";

const PullToRefreshContainer: FC<PropsWithChildren> = ({ children }) => {
  const { userActions } = useDispatchActions();
  const { t } = useTranslation();
  const { notify } = useNotify();
  const handleRefresh: () => Promise<void> = () =>
    new Promise((resolve, reject) => {
      return setTimeout(() => {
        userActions.fetch(() => notify(t("Successfully refreshed the data!")));
        resolve();
        reject();
      }, 1500);
    });
  const pullingContent = (
    <div className="w-full text-center p-2">
      {t("Refreshing the data...")}
      {emojis.smile}
    </div>
  );
  return (
    <PullToRefresh onRefresh={handleRefresh} pullingContent={pullingContent}>
      <>{children}</>
    </PullToRefresh>
  );
};

export default PullToRefreshContainer;
