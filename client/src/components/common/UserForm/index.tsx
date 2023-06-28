import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDispatchActions from "../../../hooks/useDispatchActions";
import { getUserFormTexts } from "./utils";
import useUserForm from "./useUserForm";
import { PrismaError } from "../../../global/error.interfaces";
import {
  getPrismaErrorAlertMessages,
  renderAlertErrorMessages,
  renderFieldErrorMessages,
} from "../../../utils/error.utils";

const UserForm = () => {
  const { authActions } = useDispatchActions();
  const { t } = useTranslation();
  const [isSignIn, setIsSignIn] = useState(true);
  const [alertErrorMessages, setAlertErrorMessages] = useState<string[]>([]);
  const { registerers, handleSubmit, errors, clearErrors } =
    useUserForm(isSignIn);
  const onSubmit = handleSubmit(async data => {
    if (isSignIn) {
      authActions.signIn(data, () =>
        setAlertErrorMessages([t("Sign in failed.")])
      );
    } else {
      const handlePrismaError = (prismaError: PrismaError) => {
        const alertMessages = getPrismaErrorAlertMessages(prismaError);
        setAlertErrorMessages(alertMessages);
      };
      authActions.signUp(data, () => setIsSignIn(true), handlePrismaError);
    }
  });
  const { title, action, transition, transitionButton } =
    getUserFormTexts(isSignIn);
  useEffect(() => {
    // reset states upon change form mode
    clearErrors();
    setAlertErrorMessages([]);
  }, [isSignIn, clearErrors]);
  return (
    <div className="card flex flex-col gap-4 bg-slate-100 p-12 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{t(title)}</h2>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        {!isSignIn && (
          <>
            <label className="label">
              <span className="label-text">{t("Username")}</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder={t("Username")}
              {...registerers.username}
            />
            {renderFieldErrorMessages(errors.username)}
          </>
        )}
        <label className="label">
          <span className="label-text">{t("Email")}</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="email"
          placeholder={t("Email")}
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.email}
        />
        {renderFieldErrorMessages(errors.email)}
        <label className="label">
          <span className="label-text">{t("Password")}</span>
        </label>
        <input
          className="input input-bordered w-full"
          type="password"
          placeholder={t("Password")}
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.password}
        />
        {renderFieldErrorMessages(errors.password)}
        <button className="btn btn-primary normal-case text-base-100 mt-4">
          {t(action)}
        </button>
      </form>
      <div className="flex justify-center items-center w-full">
        <span>{t(transition)}</span>
        <button
          className="btn btn-link normal-case no-underline hover:no-underline"
          onClick={() => setIsSignIn(prev => !prev)}
        >
          {t(transitionButton)}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
