import Skeleton from "react-loading-skeleton";
import { PayoutDetails } from "../../../types";

export interface PayoutSummaryProps extends Partial<PayoutDetails> {
  amountToReceive: number;
}

export const PayoutSummary = (data: PayoutSummaryProps) => {
  let NGN = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div>
      <p style={{ color: "white" }}>Summary</p>
      <div className="summary">
        <div className="summary-content">
          <p className="summary-head">Amount: </p>
          <div className="summary-details">
            <p className="summary-value">
              {data.from_amount}
              {data.from_currency?.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Payment Address: </p>
          <div className="summary-details">
            <p className="summary-value">
              {data.payment_address || <Skeleton width={"90px"} />}
            </p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">Payment Link: </p>
          <div className="summary-details">
            <p className="summary-value">{data.public_id}</p>
          </div>
        </div>
        <div className="summary-content">
          <p className="summary-head">You would receive (Subject to change)</p>
          <div className="summary-details">
            <p className="summary-value">
              {data.amountToReceive ? (
                NGN.format(data?.amountToReceive)
              ) : (
                <Skeleton width={"90px"} />
              )}
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
                {data.amountToReceive ? (
                  NGN.format(data.amountToReceive)
                ) : (
                  <Skeleton width={"90px"} />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
