import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  rendeerrorMessage,
  renderFieldErrorMessages,
} from "../../utils/renderers.utils";
import { updateGoalAmount } from "../../api/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getGoalAmount } from "../../states/user.reducer";

interface FormValues {
  goalAmount: number;
}

const UpdateGoalAmountForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isGoalAmountUpdated, setIsGoalAmountUpdated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const goalAmount = useSelector((state: RootState) => getGoalAmount(state));
  const onSubmit = handleSubmit(async data => {
    try {
      const res = await updateGoalAmount(data.goalAmount);
      if (res.success) {
        setIsGoalAmountUpdated(true);
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
          type="number"
          defaultValue={goalAmount}
          {...register("goalAmount", {
            required: "Goal amount is required.",
          })}
        />
        <button
          type="submit"
          className="btn btn-primary normal-case"
          disabled={isGoalAmountUpdated}
        >
          {isGoalAmountUpdated ? "Updated!" : "Update"}
        </button>
      </div>
      {renderFieldErrorMessages(errors.goalAmount)}
      {rendeerrorMessage(serverMessage)}
    </form>
  );
};

export default UpdateGoalAmountForm;
