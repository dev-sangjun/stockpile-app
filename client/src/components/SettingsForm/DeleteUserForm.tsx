import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useDispatchActions from "../../hooks/useDispatchActions";
import { BASE_INPUT_CLASSES } from "../../constants/classes.constants";

interface FormValues {
  delete: string;
}

const DeleteUserForm = () => {
  const { userActions } = useDispatchActions();
  const { t } = useTranslation();
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
          className={BASE_INPUT_CLASSES.sm}
          type="text"
          placeholder={t("Type DELETE to confirm")}
          {...register("delete", {
            validate: value => value === compareText,
          })}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm normal-case"
          disabled={!isValid}
        >
          {t("Delete")}
        </button>
      </div>
    </form>
  );
};

export default DeleteUserForm;
