import { useSelector } from "react-redux";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import useDispatchActions from "../../../../hooks/useDispatchActions";
import {
  AddInvestmentToPortfolioDto,
  UpdateInvestmentDto,
} from "../../../../api/interfaces";
import { getEntity } from "../../../../store/entity.reducer";
import { RootState } from "../../../../store";

interface FormValues {
  quantity: number;
  cost: number;
}

interface Registerers {
  quantity: UseFormRegisterReturn<"quantity">;
  cost: UseFormRegisterReturn<"cost">;
}

const useInvestmentForm = (selectedSymbol: string) => {
  const { investmentActions, modalActions } = useDispatchActions();
  const { selectedPortfolio, selectedInvestment } = useSelector(
    (state: RootState) => getEntity(state)
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>();
  const registerers: Registerers = {
    quantity: register("quantity", {
      required: "Quantity is required.",
      valueAsNumber: true,
      min: {
        value: 0.01,
        message: "Quantity should be greater than 0.",
      },
    }),
    cost: register("cost", {
      required: "Price is required.",
      valueAsNumber: true,
      min: {
        value: 0.01,
        message: "Price should be greater than 0.",
      },
    }),
  };
  const onSubmit = handleSubmit(async data => {
    if (!selectedPortfolio) {
      modalActions.close();
      return;
    }
    if (selectedInvestment) {
      const dto: UpdateInvestmentDto = {
        quantity: data.quantity,
        avgCost: data.cost,
      };
      investmentActions.update(selectedInvestment.id, dto);
    } else {
      const dto: AddInvestmentToPortfolioDto = {
        ...data,
        stockId: selectedSymbol,
      };
      investmentActions.add(selectedPortfolio.id, dto);
    }
    modalActions.close();
  });
  return { registerers, onSubmit, watch, errors, reset, isValid };
};

export default useInvestmentForm;
