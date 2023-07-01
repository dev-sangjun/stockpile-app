import { useEffect } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface Registerers {
  username?: UseFormRegisterReturn<"username">;
  email: UseFormRegisterReturn<"email">;
  password: UseFormRegisterReturn<"password">;
}

const useUserForm = (isSignIn: boolean) => {
  const { t } = useTranslation();
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  useEffect(() => {
    unregister();
  }, [isSignIn, unregister]);
  const registerers: Registerers = {
    username: register(
      "username",
      isSignIn
        ? {}
        : {
            required: t("Username is required."),
            minLength: {
              value: 6,
              message: t("Username must have at least 6 characters."),
            },
          }
    ),
    email: register("email", { required: t("Email is required.") }),
    password: register("password", {
      required: t("Password is required."),
      minLength: isSignIn
        ? { value: 0, message: "" }
        : {
            value: 8,
            message: t("Password must have at least 8 characters."),
          },
    }),
  };
  return {
    registerers,
    handleSubmit,
    errors,
    clearErrors,
  };
};

export default useUserForm;
