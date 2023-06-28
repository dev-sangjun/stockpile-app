import { useEffect, useState } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
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
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  useEffect(() => {
    if (isSignIn) {
      setRegisterers(prev => ({
        email: prev.email,
        password: prev.password,
      }));
    } else {
      setRegisterers(prev => ({
        ...prev,
        username: register("username", {
          required: t("Username is required."),
          minLength: {
            value: 6,
            message: "Username must have at least 6 characters.",
          },
        }),
      }));
    }
  }, [t, register, isSignIn]);
  const [registerers, setRegisterers] = useState<Registerers>({
    username: undefined,
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
  });
  return { registerers, handleSubmit, errors, clearErrors };
};

export default useUserForm;
