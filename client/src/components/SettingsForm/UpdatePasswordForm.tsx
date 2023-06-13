import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  rendeerrorMessage,
  renderFieldErrorMessages,
} from "../../utils/renderers.utils";
import { updatePassword } from "../../api/user.api";

interface FormValues {
  password: string;
}

const UpdatePassword: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const onSubmit = handleSubmit(async data => {
    try {
      const res = await updatePassword(data.password);
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
          className="input input-bordered w-full"
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
          className="btn btn-primary normal-case"
          disabled={isPasswordUpdated}
        >
          {isPasswordUpdated ? "Updated!" : "Update"}
        </button>
      </div>
      {renderFieldErrorMessages(errors.password)}
      {rendeerrorMessage(serverMessage)}
    </form>
  );
};

export default UpdatePassword;
