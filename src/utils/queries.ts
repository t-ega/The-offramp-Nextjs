import apiRequest from "./api-request";
import { ENDPOINTS } from "./endpoints";

export const fetchCryptoCurrencies = async () => {
  const res = await apiRequest.get(ENDPOINTS.CURRENCIES);
  return res.data;
};

type Quotation = {
  quote_type?: "send" | "receive";
  currency: string;
  vol: number;
};

export const getQuotations = async (data: Quotation) => {
  const { quote_type, ...rest } = data;
  const quote = quote_type || "send";
  const url = `${ENDPOINTS.MARKETS}?quote_type=${quote}&vol=${rest.vol}&currency=${rest.currency}`;
  const res = await apiRequest.get(url);
  return res.data;
};

export const listBanks = async () => {
  return await apiRequest.get(ENDPOINTS.LIST_BANKS);
};

type AccountDetails = {
  bank_code: string;
  account_number: string;
};

export const resolveBank = async (data: AccountDetails) => {
  const { bank_code, account_number } = data;
  const url = `${ENDPOINTS.RESOLVE_BANK}?bank_code=${bank_code}&account_number=${account_number}`;
  return await apiRequest.get(url);
};

export const fetchPayoutStatus = async (public_id: string) => {
  const url = `${ENDPOINTS.PAYOUT_STATUS}?public_id=${public_id}`;
  return await apiRequest.get(url);
};

export const fetchTransactionHistory = async () => {
  return await apiRequest.get(ENDPOINTS.TRANSACTION_HISTORY);
};
