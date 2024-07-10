import { useNavigate } from "react-router-dom";
import SadSvg from "../../../assets/sad-svgrepo-com.svg";
import { useEffect, useState } from "react";

const FailedCard = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);

  const redirect = () => {
    setTimeLeft(60);
    return setTimeout(() => {
      navigate("/");
    }, 10000);
  };

  const startRedirectTimer = () => {
    return setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return (prev -= 1);
        return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    const timeout = redirect();
    const interval = startRedirectTimer();

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="popper">
        <img src={SadSvg} className="popper__icon" alt="ailure__icon" />
      </div>

      <div className="awaiting-payment">
        <div className="awaiting-payment__inner">
          <h3>Transaction Failed</h3>
          <p>
            This may have been to many factors such as manually cancelling the
            transaction or it may have timed out. Or more sadly we were not able
            to process your payment
          </p>
          <h4>
            Anyways, You would be redirect to the home screen in {timeLeft} secs
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FailedCard;
