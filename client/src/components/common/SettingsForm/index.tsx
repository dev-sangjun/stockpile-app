import { FC, ReactNode } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateGoalAmountForm from "./UpdateGoalAmountForm";
import DeleteUserForm from "./DeleteUserForm";

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

const renderSettingItems = () => {
  return settingItems.map(({ title, content }) => (
    <div className="collapse collapse-arrow bg-base-100" key={title}>
      <input type="checkbox" name="accordion" />
      <div className="collapse-title font-medium pl-0">{title}</div>
      <div className="collapse-content pl-0">{content}</div>
    </div>
  ));
};

const SettingsForm: FC = () => {
  return (
    <div className="flex flex-col gap-4 md:max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Settings</h2>
      {renderSettingItems()}
    </div>
  );
};

export default SettingsForm;
