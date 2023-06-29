import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDispatchActions from "../../hooks/useDispatchActions";
import useUserForm from "./useUserForm";
import { PrismaError } from "../../global/error.interfaces";
import {
  getPrismaErrorAlertMessages,
  renderAlertErrorMessages,
  renderFieldErrorMessages,
} from "../../utils/error.utils";
import {
  BASE_INPUT_CLASSES,
  BASE_LABEL_CLASSES,
  PRIMARY_BUTTON_CLASSES,
} from "../../constants/classes.constants";

const getUserFormTexts = (isSignIn: boolean) => ({
  title: isSignIn ? "Sign in" : "Sign up",
  greetings: isSignIn
    ? "Welcome back! Let's verify your identity."
    : "Welcome! Please enter your details to sign up.",
  action: isSignIn ? "Sign in" : "Sign up",
  transition: isSignIn ? "Don't have an account?" : "Already have an account?",
  transitionButton: isSignIn ? "Sign up" : "Sign in",
});

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
    <div className="card flex flex-col gap-4 bg-slate-100 p-8 md:p-12 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold">{t(title)}</h2>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        {!isSignIn && (
          <>
            <label className={BASE_LABEL_CLASSES.default}>
              {t("Username")}
            </label>
            <input
              className={BASE_INPUT_CLASSES.sm}
              type="text"
              placeholder={t("Username")}
              {...registerers.username}
            />
            {renderFieldErrorMessages(errors.username)}
          </>
        )}
        <label className={BASE_LABEL_CLASSES.default}>{t("Email")}</label>
        <input
          className={BASE_INPUT_CLASSES.sm}
          type="email"
          placeholder={t("Email")}
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.email}
        />
        {renderFieldErrorMessages(errors.email)}
        <label className={BASE_LABEL_CLASSES.default}>{t("Password")}</label>
        <input
          className={BASE_INPUT_CLASSES.sm}
          type="password"
          placeholder={t("Password")}
          autoComplete={isSignIn ? "on" : "off"}
          {...registerers.password}
        />
        {renderFieldErrorMessages(errors.password)}
        <button className={`${PRIMARY_BUTTON_CLASSES.md} mt-4`}>
          {t(action)}
        </button>
      </form>
      <div className="flex justify-center items-center w-full text-sm md:text-md">
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
