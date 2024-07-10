import { useEffect, useState } from "react";

import { PayoutDetails } from "../../../types";
import "../../../orderStyle.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPayoutStatus } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import TransactionNotFound from "../../transaction-notfound";
import SuccessCard from "./success-card";
import FailedCard from "./failed-card";
import PayoutInitiated from "./payout-status/initiated";
import Awaiting from "./payout-status/awaiting";
import { getNotificationMessage } from "../../../utils/notification-messages";
import { PAYOUT_STATUS } from "../../../utils/payout-status";
import PayoutStatusSkeleton from "./payout-status/skeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const PayoutModal = () => {
  const [payoutData, setPayoutData] = useState<PayoutDetails>();
  const [notificationPermitted, setNotificationPermitted] = useState(false);
  const [currentNotification, setCurrentNotification] = useState("");

  const { public_id } = useParams();

  const paymentQuery = useQuery({
    queryKey: ["payout", public_id],
    queryFn: () => fetchPayoutStatus(public_id!),
    enabled: !!public_id,
    refetchIntervalInBackground: true,
    refetchInterval: 15000,
    retry: (retryCount, error) => {
      const errMessage = error as any;
      if (errMessage.response?.status == 404) return false;

      if (retryCount < 3) return true;
      return false;
    },
  });

  useEffect(() => {
    const response = paymentQuery.data;
    if (!response) return;

    setPayoutData(response.data.data);
    const msg = getNotificationMessage(response.data.data.status);

    if (msg && notificationPermitted && currentNotification != msg) {
      new Notification("Payment Status Update", { body: msg });
      setCurrentNotification(msg); // So it does not send multiple of the same notifications
    }
  }, [paymentQuery.data]);

  function getNotificationPermission() {
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationPermitted(true);
        }
      });
    }
  }

  useEffect(() => {
    getNotificationPermission();
  }, []);

  const sectionToDisplay = () => {
    if (!payoutData?.status) return <PayoutStatusSkeleton />;

    switch (payoutData?.status) {
      case PAYOUT_STATUS.INITIATED:
        return <PayoutInitiated payoutData={payoutData} />;
      case PAYOUT_STATUS.PAYOUT_COMPLETED:
        return (
          <SuccessCard receipient_email={payoutData?.receipient_email || ""} />
        );
      case PAYOUT_STATUS.FAILED:
        return <FailedCard />;
      default:
        return <Awaiting payoutData={payoutData} />;
    }
  };

  if (paymentQuery.error) {
    const error = paymentQuery.error as any;

    if (error.response?.status == 404) {
      return <TransactionNotFound />;
    }
  }

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={`modal-backdrop`}>
        <div className="checkout">
          <div className="confirm-modal__top">{sectionToDisplay()}</div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PayoutModal;
