import { FC } from "react";
import { renderSettingItems } from "./renderers";

const SettingsForm: FC = () => {
  return (
    <div className="flex flex-col gap-4 md:max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Settings</h2>
      {renderSettingItems()}
    </div>
  );
};

export default SettingsForm;
