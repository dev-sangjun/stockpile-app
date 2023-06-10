import { useEffect, useState } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";

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

const useFormWrapper = (isSignIn: boolean) => {
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
          required: "Username is required.",
          minLength: {
            value: 6,
            message: "Username has to be at least 6 characters",
          },
        }),
      }));
    }
  }, [register, isSignIn]);
  const [registerers, setRegisterers] = useState<Registerers>({
    username: undefined,
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
