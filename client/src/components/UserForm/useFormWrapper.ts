import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const useFormWrapper = (isSignIn: boolean) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  useEffect(() => {
    setRegisterers(prev => ({
      ...prev,
    }));
  }, [isSignIn]);
  const [registerers, setRegisterers] = useState({
    username: isSignIn
      ? {}
      : register("username", {
          required: "Username is required.",
          minLength: {
            value: 6,
            message: "Username has to be at least 6 characters",
          },
        }),
    email: register("email", { required: "Email is required." }),
    password: register("password", {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password has to be at least 6 characters",
      },
    }),
  });
  return { registerers, handleSubmit, errors, clearErrors };
};

export default useFormWrapper;
