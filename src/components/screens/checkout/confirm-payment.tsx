import { useContext } from "react";
import { CheckoutContext } from "../../../utils/checkout-content";

const ConfirmPayment = () => {
  const context = useContext(CheckoutContext);

  return (
    <div>
      <h2 className="info">Confirm Transaction</h2>
      <div>
        <h3 className="info">Account Details</h3>
        <div className="bank_entry__item">
          <p className="info">Account Number</p>
          <input
            type="number"
            className="bank-info"
            disabled
            value={context?.account_number}
          />
        </div>
        <div className="bank_entry__item">
          <p className="info">Bank</p>
          <input
            type="text"
            className="bank-info"
            disabled
            value={context?.account_name}
          />
        </div>
        <div className="bank_entry__item">
          <p className="info">Receipient Email</p>
          <input
            type="text"
            className="bank-info"
            disabled
            value={context?.receipient_email}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
