import { FC } from "react";
import { useForm } from "react-hook-form";
import useDispatchActions from "../../../hooks/useDispatchActions";

interface FormValues {
  delete: string;
}

const DeleteUserForm: FC = () => {
  const { userActions } = useDispatchActions();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>();
  const compareText = "DELETE";
  const onSubmit = handleSubmit(() => {
    userActions.deleteUser();
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2 px-2">
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          placeholder="Type DELETE to confirm"
          {...register("delete", {
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
    </form>
  );
};

export default DeleteUserForm;
