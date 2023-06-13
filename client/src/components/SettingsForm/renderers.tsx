import { ReactNode } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateGoalAmountForm from "./UpdateGoalAmountForm";

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
];

export const renderSettingItems = () => {
  return settingItems.map(({ title, content }) => (
    <div className="collapse collapse-arrow bg-base-100" key={title}>
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title font-medium">{title}</div>
      <div className="collapse-content">{content}</div>
    </div>
  ));
};
