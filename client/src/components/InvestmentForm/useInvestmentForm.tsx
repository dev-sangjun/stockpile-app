import { UseFormRegisterReturn, useForm } from "react-hook-form";

interface FormValues {
  quantity: number;
  cost: number;
}

interface Registerers {
  quantity: UseFormRegisterReturn<"quantity">;
  cost: UseFormRegisterReturn<"cost">;
}

const useAddInvestmentForm = (isUpdate = false) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>();
  console.log(errors);
  const registerers: Registerers = {
    quantity: register("quantity", {
      required: isUpdate ? false : "Quantity is required.",
      valueAsNumber: true,
      min: {
        value: 0.01,
        message: "Quantity should be greater than 0.",
      },
    }),
    cost: register("cost", {
      valueAsNumber: true,
      min: {
        value: 0.01,
        message: `${isUpdate ? "Cost" : "Price"} should be greater than 0.`,
      },
    }),
  };
  return { registerers, handleSubmit, getValues, errors, reset, isValid };
};

export default useAddInvestmentForm;
