import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  renderErrorMessage,
  renderFieldErrorMessages,
} from "../../../utils/error.utils";

interface FormValues {
  delete: string;
}

const DeleteUserForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const [serverMessage, setServerMessage] = useState("");
  const compareText = "DELETE";
  const onSubmit = handleSubmit(async data => {
    //
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2">
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          placeholder="Type DELETE to confirm"
          {...register("delete", {
            required: "Goal amount is required.",
            validate: value => value === compareText,
          })}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm normal-case"
          disabled={!isValid}
        >
          Delete
        </button>
      </div>
      {renderFieldErrorMessages(errors.delete)}
      {renderErrorMessage(serverMessage)}
    </form>
  );
};

export default DeleteUserForm;
