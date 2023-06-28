import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { userAPI } from "../../../api";
import {
  renderErrorMessage,
  renderFieldErrorMessages,
} from "../../../utils/error.utils";

interface FormValues {
  password: string;
}

const UpdatePasswordForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const onSubmit = handleSubmit(async data => {
    try {
      const res = await userAPI.updatePassword(data.password);
      if (res.success) {
        setIsPasswordUpdated(true);
        setServerMessage("");
      } else {
        setServerMessage(res.message || "Something went wrong!");
      }
    } catch (e) {
      console.error(e);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2">
        <input
          className="input input-bordered input-sm w-full"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password has to be at least 6 characters",
            },
          })}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm normal-case"
          disabled={isPasswordUpdated}
        >
          {isPasswordUpdated ? "Updated!" : "Update"}
        </button>
      </div>
      {renderFieldErrorMessages(errors.password)}
      {renderErrorMessage(serverMessage)}
    </form>
  );
};

export default UpdatePasswordForm;
