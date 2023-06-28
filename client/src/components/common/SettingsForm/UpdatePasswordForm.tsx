import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import isEmpty from "is-empty";
import {
  renderErrorMessage,
  renderFieldErrorMessages,
} from "../../../utils/error.utils";
import useDispatchActions from "../../../hooks/useDispatchActions";

interface FormValues {
  password: string;
}

const UpdateGoalAmountForm: FC = () => {
  const { userActions } = useDispatchActions();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const isSubmitButtonDisabled =
    !isValid || isEmpty(watch("password")) || isPasswordUpdated;
  const onSubmit = handleSubmit(data => {
    const onSuccess = () => {
      reset();
      setIsPasswordUpdated(true);
      setServerMessage("");
    };
    const onError = (message: string) => {
      setServerMessage(message);
    };
    userActions.update("password", data.password, onSuccess, onError);
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2 px-2">
        <input
          className="input input-bordered input-sm w-full"
          type="password"
          {...register("password", {
            required: t("New password is required."),
            minLength: {
              value: 8,
              message: t("Password must have at least 8 characters."),
            },
          })}
          placeholder={t("New Password")}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm normal-case"
          disabled={isSubmitButtonDisabled}
        >
          {t(isPasswordUpdated ? "Updated!" : "Update")}
        </button>
      </div>
      {renderFieldErrorMessages(errors.password)}
      {renderErrorMessage(serverMessage)}
    </form>
  );
};

export default UpdateGoalAmountForm;
