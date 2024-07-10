import SpinningCoin from "../spinning-coin";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PayoutStatusSkeleton = () => {
  return (
    <div>
      <div>
        <SpinningCoin />
      </div>
      <div className="transaction-link">
        <Skeleton />
        <Skeleton />
      </div>

      <Skeleton
        style={{
          width: "400px",
          margin: "20px 0",
          height: "100px",
        }}
      />

      <Skeleton
        style={{
          width: "400px",
          margin: "20px 0",
          height: "100px",
        }}
      />
    </div>
  );
};

export default PayoutStatusSkeleton;
