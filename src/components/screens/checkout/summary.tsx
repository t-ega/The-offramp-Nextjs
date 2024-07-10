import { useContext } from "react";
import { CheckoutContext } from "../../../utils/checkout-content";

export const Summary = () => {
  const context = useContext(CheckoutContext);
  let NGN = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  function getRandomTimeInSeconds() {
    const randomSeconds = Math.floor(Math.random() * (180 - 60 + 1)) + 60;
    const minutes = Math.floor(randomSeconds / 60);
    const seconds = randomSeconds % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <p style={{ color: "white" }}>Summary</p>
      <div className="summary">
        <div className="summary-content">
          <p className="summary-head">Amount: </p>
          <div className="summary-details">
            <p className="summary-value">
              {`${
                context?.send_amount
                  ? `${context?.send_amount}
              ${context?.crypto_name}`
                  : "N/A"
              }`}
            </p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">You would receive (Subject to change)</p>
          <div className="summary-details">
            <p className="summary-value">
              {`${
                context?.receive_amount
                  ? `${NGN.format(context?.receive_amount)}`
                  : "N/A"
              }`}
            </p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Processing Time Estimated: </p>
          <div className="summary-details">
            {context?.processing_fee ? (
              <>
                <p className="summary-value">{getRandomTimeInSeconds()} mins</p>
                <p className="summary-sub">⚡</p>
              </>
            ) : (
              <p className="summary-value">N/A</p>
            )}
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Processing Fee</p>
          <div className="summary-details">
            <p className="summary-value">
              {NGN.format(context?.processing_fee || 0)}
            </p>
          </div>
        </div>
        <hr style={{ borderTop: "dotted 1px", margin: "20px 0px" }} />
        <div className="summary-footer">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="summary-total" style={{ color: "white" }}>
              Total Amount
            </p>
            <div className="summary-details">
              <p className="summary-total">
                {" "}
                {NGN.format(context?.receive_amount || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
