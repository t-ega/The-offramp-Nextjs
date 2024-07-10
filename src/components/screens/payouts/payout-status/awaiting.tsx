import { toast } from "react-toastify";
import Button from "../../../button";
import Timeline from "../../payouts/timeline";
import { PayoutDataProps } from "./initiated";
import SpinningCoin from "../spinning-coin";

const Awaiting = (props: PayoutDataProps) => {
  const { payoutData } = props;

  const buildUrl = () => {
    return `${window.location.protocol}/${window.location.host}/payment/confirm/${payoutData?.public_id}`;
  };

  const copyUrl = () => {
    const permalink = buildUrl();
    navigator.clipboard.writeText(permalink);
    toast.success("Link copied");
  };

  return (
    <div>
      <div>
        <SpinningCoin />
      </div>
      <div className="transaction-link">
        <h3>Transaction Link</h3>
        <p>{buildUrl()}</p>
        <Button onClick={copyUrl} content="Copy" variant="rounded" />
      </div>

      <div className="awaiting-payment">
        <div className="awaiting-payment__inner">
          <h3>Almost there...</h3>
          <p>Please hold on while we check the status of the transaction</p>
        </div>
      </div>
      <Timeline
        status={payoutData?.status || ""}
        receipient_email={payoutData?.receipient_email || ""}
      />
    </div>
  );
};

export default Awaiting;
