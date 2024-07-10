import SadSvg from "../assets/sad-svgrepo-com.svg";

const TransactionNotFound = () => {
  return (
    <div className={`modal-backdrop`}>
      <div className="checkout">
        <div className="popper">
          <img src={SadSvg} className="popper__icon" alt="ailure__icon" />
        </div>
        <div className="awaiting-payment">
          <div className="awaiting-payment__inner">
            <h3>Invalid Transaction Link</h3>
            <p>
              Transaction link provided does not match with any transaction on
              the system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionNotFound;
