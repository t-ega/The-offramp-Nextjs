import apiRequest from "./api-request";
import { ENDPOINTS } from "./endpoints";
import { PayoutPayload } from "./validation/payout";

export const createPayout = async (data: PayoutPayload) => {
  const url = ENDPOINTS.PAYOUTS;
  return await apiRequest.post(url, data);
};

export const markPayoutAsPaid = async (public_id: string) => {
  const url = ENDPOINTS.UPDATE_PAYOUT_STATUS(public_id);
  return await apiRequest.post(url, { status: "initiate_deposit" });
};

export const cancelPayout = async (public_id: string) => {
  const url = ENDPOINTS.UPDATE_PAYOUT_STATUS(public_id);
  return await apiRequest.post(url, { status: "cancel" });
};

interface AuthPayload {
  email: string;
  password: string;
}

export const signIn = async (data: AuthPayload) => {
  return await apiRequest.post(ENDPOINTS.SIGN_IN, data);
};

export const signUp = async (data: AuthPayload) => {
  return await apiRequest.post(ENDPOINTS.SIGN_UP, data);
};
