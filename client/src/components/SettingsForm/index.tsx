import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateGoalAmountForm from "./UpdateGoalAmountForm";
import DeleteUserForm from "./DeleteUserForm";
import Section from "../Section";

interface SettingItem {
  title: string;
  content: ReactNode;
}

const settingItems: SettingItem[] = [
  {
    title: "Update password",
    content: <UpdatePasswordForm />,
  },
  {
    title: "Update goal amount",
    content: <UpdateGoalAmountForm />,
  },
  {
    title: "Delete account",
    content: <DeleteUserForm />,
  },
];

const SettingsForm = () => {
  const { t } = useTranslation();
  const renderSettingItems = () => {
    return settingItems.map(({ title, content }) => (
      <div
        className="collapse collapse-arrow bg-base-100 max-w-xl mx-auto"
        key={title}
      >
        <input type="checkbox" name="accordion" />
        <div className="collapse-title font-semibold pl-0">{t(title)}</div>
        <div className="collapse-content pl-0">{content}</div>
      </div>
    ));
  };
  return <Section title="Settings">{renderSettingItems()}</Section>;
};

export default SettingsForm;
