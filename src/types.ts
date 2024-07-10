export type CheckoutDetails = {
  bank_code?: string;
  account_number?: string;
  account_name?: string;
  from_currency?: string;
  crypto_name?: string;
  crypto_display_name?: string;
  currency_price?: number;
  send_amount?: number;
  receipient_email?: string;
  processing_fee?: number;
  receive_amount?: number;
};

export type PayoutDetails = {
  payment_address: string;
  from_currency: string;
  status: string;
  from_amount: number;
  receipient_email: string;
  account_name: string;
  public_id: string;
};

export interface ICheckoutProps {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  setData: (e: Partial<CheckoutDetails>) => void;
}

export interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  payoutLink: string;
}

export interface CheckoutModal {
  isVisible: boolean;
  onClose: () => void;
}
