import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import {
  renderErrorMessage,
  renderFieldErrorMessages,
} from "../../../utils/error.utils";
import { toFormattedNumber } from "../../../utils/common.utils";
import useDispatchActions from "../../../hooks/useDispatchActions";
import isEmpty from "is-empty";

interface FormValues {
  goalAmount: number;
}

const UpdateGoalAmountForm: FC = () => {
  const { userActions } = useDispatchActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isGoalAmountUpdated, setIsGoalAmountUpdated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const { goalAmount } = useSelector((state: RootState) => getUser(state));
  const [value, setValue] = useState(toFormattedNumber(goalAmount, false));
  const isSubmitButtonDisabled =
    isEmpty(value) ||
    isGoalAmountUpdated ||
    toFormattedNumber(value, false) === toFormattedNumber(goalAmount, false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsGoalAmountUpdated(false);
    if (isEmpty(value)) {
      setValue("");
      return;
    }
    setValue(toFormattedNumber(value, false));
  };
  const onSubmit = handleSubmit(() => {
    const onSuccess = () => {
      setIsGoalAmountUpdated(true);
      setServerMessage("");
    };
    const onError = (message: string) => {
      setServerMessage(message);
    };
    userActions.update("goal-amount", value, onSuccess, onError);
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2 px-2">
        <input
          className="input input-bordered input-sm w-full"
          type="text"
          {...register("goalAmount", {
            required: "Goal amount is required.",
          })}
          value={value}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm normal-case"
          disabled={isSubmitButtonDisabled}
        >
          {isGoalAmountUpdated ? "Updated!" : "Update"}
        </button>
      </div>
      {renderFieldErrorMessages(errors.goalAmount)}
      {renderErrorMessage(serverMessage)}
    </form>
  );
};

export default UpdateGoalAmountForm;
