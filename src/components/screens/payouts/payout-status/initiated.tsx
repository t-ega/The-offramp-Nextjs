import { useEffect, useState } from "react";
import { PayoutSummary } from "../payout-summary";
import Button from "../../../button";
import { PayoutDetails } from "../../../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuotations } from "../../../../utils/queries";
import {
  QuotationSchema,
  QuotationSchemaType,
} from "../../../../utils/validation/market-price";
import { toast } from "react-toastify";
import { cancelPayout, markPayoutAsPaid } from "../../../../utils/mutations";
import apiRequest from "../../../../utils/api-request";
import { useNavigate } from "react-router-dom";
import SpinningCoin from "../spinning-coin";
import QrCodeDisplay from "../qr-code";
import Skeleton from "react-loading-skeleton";

export interface PayoutDataProps {
  payoutData?: PayoutDetails;
}

const PayoutInitiated = (props: PayoutDataProps) => {
  const { payoutData } = props;
  const [quotation, setQuotation] = useState<QuotationSchemaType>();
  const [refreshTimeRemaining, setRefreshTimeRemaining] = useState(60);
  const navigate = useNavigate();

  const quotationQuery = useQuery({
    queryKey: ["quotationFiat"],
    queryFn: () =>
      getQuotations({
        vol: payoutData?.from_amount!,
        quote_type: "send",
        currency: `${payoutData?.from_currency}ngn`,
      }),
    enabled: !!payoutData,
    refetchInterval: 60000,
  });

  const payoutMutation = useMutation({
    mutationFn: markPayoutAsPaid,
  });

  useEffect(() => {
    const response = quotationQuery?.data;
    if (!response) return;

    const validation = QuotationSchema.safeParse(response.data);

    if (validation.error) {
      toast.error("😓Could not parse server conversion response");
      return;
    }

    const validatedData = validation.data;
    setQuotation(validatedData);
  }, [quotationQuery.data]);

  const updatePayoutStatus = () => {
    payoutMutation.mutate(payoutData?.public_id!, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (err) => {
        const msg = apiRequest.formatApiErrorMessage(err);
        toast.error(msg);
      },
    });
  };

  const cancelPayoutMutation = useMutation({
    mutationFn: cancelPayout,
  });

  const handleCancelPayout = () => {
    cancelPayoutMutation.mutate(payoutData?.public_id!, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (err) => {
        const msg = apiRequest.formatApiErrorMessage(err);
        toast.error(msg);
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTimeRemaining((prev) => {
        if (prev > 0) return (prev -= 1);
        return (prev = 60);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <SpinningCoin />
      </div>

      <PayoutSummary
        from_amount={payoutData?.from_amount || 0}
        public_id={payoutData?.public_id!}
        payment_address={payoutData?.payment_address!}
        amountToReceive={quotation?.amountToReceive!}
        from_currency={payoutData?.from_currency || "N/A"}
      />

      {payoutData?.payment_address ? (
        <QrCodeDisplay data={payoutData?.payment_address} />
      ) : (
        <Skeleton
          width={"100%"}
          height={"300px"}
          style={{ margin: "20px 0" }}
        />
      )}

      <div className="info-display">
        <img
          src="https://img.icons8.com/?size=30&id=63308&format=png&color=000000"
          alt="info"
          className="info-icon"
        />
        <p>Quotation would refresh in {refreshTimeRemaining} secs</p>
      </div>

      <Button
        executing={payoutMutation.isPending}
        onClick={updatePayoutStatus}
        content={"I have paid"}
        variant="full"
      />
      <Button
        executing={cancelPayoutMutation.isPending}
        onClick={handleCancelPayout}
        content={"Please, I wish to cancel"}
        variant="outline"
      />
    </>
  );
};

export default PayoutInitiated;
