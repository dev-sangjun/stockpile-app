import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  rendeerrorMessage,
  renderFieldErrorMessages,
} from "../../utils/renderers.utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { asyncSignOut } from "../../states/user.reducer";
import userAPI from "../../api/user.api";
import { notify } from "../../utils/toast.utils";

interface FormValues {
  delete: string;
}

const DeleteUserForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const [serverMessage, setServerMessage] = useState("");
  const compareText = "DELETE";
  const onSubmit = handleSubmit(async data => {
    if (data.delete !== compareText) {
      return;
    }
    try {
      const res = await userAPI.deleteUser();
      if (res.success) {
        setServerMessage("");
        dispatch(asyncSignOut());
        notify(res.message || "Successfully deleted the account");
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
          type="text"
          placeholder="Type DELETE to confirm"
          {...register("delete", {
            required: "Goal amount is required.",
            validate: value => value === compareText,
          })}
        />
        <button
          type="submit"
          className="btn btn-primary normal-case"
          disabled={!isValid}
        >
          Delete
        </button>
      </div>
      {renderFieldErrorMessages(errors.delete)}
      {rendeerrorMessage(serverMessage)}
    </form>
  );
};

export default DeleteUserForm;
