import axios, { AxiosResponse } from "axios";
import { OperationResponseDto, UpdateInvestmentDto } from "./common.dto";
import { SERVER_ENDPOINT } from "./constants";

export const updateInvestment = async (
  investmentId: string,
  updateInvestmentDto: UpdateInvestmentDto
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.patch(
    `${SERVER_ENDPOINT}/investments/${investmentId}`,
    updateInvestmentDto,
    { withCredentials: true }
  );
  return res.data;
};
