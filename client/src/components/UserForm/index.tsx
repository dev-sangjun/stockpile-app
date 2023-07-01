import { useState } from "react";
import { useTranslation } from "react-i18next";
import useUserForm from "./useUserForm";
import {
  BASE_INPUT_CLASSES,
  BASE_LABEL_CLASSES,
  PRIMARY_BUTTON_CLASSES,
  PRIMARY_LINK_BUTTON_CLASSES,
} from "../../constants/classes.constants";
import {
  getPrismaErrorAlertMessages,
  renderAlertErrorMessages,
  renderFieldErrorMessages,
} from "../../utils/error.utils";
import useDispatchActions from "../../hooks/useDispatchActions";
import { PrismaError } from "../../global/error.interfaces";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import LanguageSelect from "../LanguageSelect";

const getUserFormTexts = (isSignIn: boolean) => ({
  mode: isSignIn ? "Sign in" : "Sign up",
  switchMode: isSignIn ? "Sign up" : "Sign in",
  transition: isSignIn ? "Don't have an account?" : "Already have an account?",
});

const UserForm = () => {
  const { authActions } = useDispatchActions();
  const { t } = useTranslation();
  const [isSignIn, setIsSignIn] = useState(true);
  const { registerers, handleSubmit, errors, clearErrors } =
    useUserForm(isSignIn);
  const [alertErrorMessages, setAlertErrorMessages] = useState<string[]>([]);
  const userFormTexts = getUserFormTexts(isSignIn);
  const renderInput = (
    type: "text" | "email" | "password",
    label: string,
    register?: UseFormRegisterReturn,
    fieldError?: FieldError
  ) => {
    return (
      <>
        <label className={BASE_LABEL_CLASSES.default}>{t(label)}</label>
        <input
          className={BASE_INPUT_CLASSES.sm}
          type={type}
          placeholder={t(label)}
          autoComplete={isSignIn ? "on" : "off"}
          {...register}
        />
        {renderFieldErrorMessages(fieldError)}
      </>
    );
  };
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
  return (
    <div className="card gap-2 bg-slate-100 p-8 md:p-12 w-full max-w-lg">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <h1 className="logo-text text-3xl md:text-4xl">Stockpile</h1>
        <div className="w-full flex justify-between items-center">
          <h2 className="md:text-xl font-bold">{t(userFormTexts.mode)}</h2>
          <div className="md:hidden ml-auto">
            <LanguageSelect isMobile />
          </div>
          <div className="hidden md:block ml-auto">
            <LanguageSelect isMobile={false} />
          </div>
        </div>
      </div>
      {renderAlertErrorMessages(alertErrorMessages)}
      <form onSubmit={onSubmit}>
        {!isSignIn &&
          renderInput(
            "text",
            "Username",
            registerers.username,
            errors.username
          )}
        {renderInput("email", "Email", registerers.email, errors.email)}
        {renderInput(
          "password",
          "Password",
          registerers.password,
          errors.password
        )}
        <button
          className={`${PRIMARY_BUTTON_CLASSES.sm} w-full mt-4`}
          type="submit"
        >
          {t(userFormTexts.mode)}
        </button>
      </form>
      <div className="flex justify-center items-center w-full gap-4 text-sm md:text-md">
        <span>{t(userFormTexts.transition)}</span>
        <button
          className={`${PRIMARY_LINK_BUTTON_CLASSES.sm}`}
          onClick={() => {
            clearErrors();
            setIsSignIn(prev => !prev);
          }}
        >
          {t(userFormTexts.switchMode)}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
