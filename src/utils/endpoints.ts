export const ENDPOINTS = {
  SIGN_IN: "login",
  SIGN_UP: "signup",
  CURRENCIES: "markets/currencylist",
  MARKETS: "markets/quotation",
  LIST_BANKS: "payouts/list_banks",
  RESOLVE_BANK: "payouts/resolve_bank",
  PAYOUTS: "payouts",
  PAYOUT_STATUS: "payouts/status",
  UPDATE_PAYOUT_STATUS: (id: string) => `payouts/${id}/status`,
  FRONTEND: {
    PAYMENT_STATUS: (public_id: string) => `/payment/confirm/${public_id}`,
  },
  TRANSACTION_HISTORY: "transactions",
};
