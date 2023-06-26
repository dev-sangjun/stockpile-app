import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { Portfolio } from "../../../../global/entity.interfaces";
import useDispatchActions from "../../../../hooks/useDispatchActions";

interface FormValues {
  name: string;
}

interface Registerers {
  name: UseFormRegisterReturn<"name">;
}

const usePortfolioForm = (selectedPortfolio?: Portfolio) => {
  const { portfolioActions, modalActions } = useDispatchActions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const registerers: Registerers = {
    name: register("name", {
      required: "Name is required",
    }),
  };
  const onSubmit = handleSubmit(async data => {
    if (selectedPortfolio) {
      await portfolioActions.update(selectedPortfolio.id, data.name);
    } else {
      await portfolioActions.add(data.name);
    }
    modalActions.close();
  });
  return { registerers, onSubmit, watch, errors, isValid };
};

export default usePortfolioForm;
