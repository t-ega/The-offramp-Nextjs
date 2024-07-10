import PartyPopper from "../../../assets/party-popper-svgrepo-com.svg";
import Timeline from "./timeline";

interface SuccessCardProps {
  receipient_email: string;
}

const SuccessCard = (props: SuccessCardProps) => {
  const { receipient_email } = props;
  return (
    <div>
      <div className="popper">
        <img src={PartyPopper} className="popper__icon" alt="success__icon" />
      </div>

      <div className="awaiting-payment">
        <div className="awaiting-payment__inner">
          <h3>Success!</h3>
          <p>Cheers to a successful offramping!</p>
        </div>
      </div>
      <div>
        <Timeline
          receipient_email={receipient_email}
          status="payout_completed"
        />
      </div>
    </div>
  );
};

export default SuccessCard;
