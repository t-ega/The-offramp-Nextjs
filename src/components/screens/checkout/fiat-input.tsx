import { useContext, useEffect } from "react";
import { CheckoutContext } from "../../../utils/checkout-content";
import { ICheckoutProps } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { getQuotations } from "../../../utils/queries";
import { toast } from "react-toastify";
import { QuotationSchema } from "../../../utils/validation/market-price";
import { z } from "zod";

const FiatInput = (props: ICheckoutProps) => {
  const { handleInput, setData } = props;
  const context = useContext(CheckoutContext);

  const handleGetQuotation = () => {
    if (!context?.receive_amount) return;
    const valid = parseInt(context?.receive_amount.toString());

    if (!valid) {
      toast.error("Please ensure you passed a valid amount");
      return;
    }
    const isInValidRange = z.number().min(500).finite().safeParse(valid);
    if (isInValidRange.error) {
      toast.error("Amount cannot be less than 500!");
      return;
    }

    quotationQuery.refetch();
  };

  const quotationQuery = useQuery({
    queryKey: ["quotationFiat"],
    queryFn: () =>
      getQuotations({
        vol: context?.receive_amount!,
        quote_type: "receive",
        currency: context?.from_currency!,
      }),
    enabled: false,
  });

  useEffect(() => {
    const response = quotationQuery?.data;
    if (!response) return;

    const validation = QuotationSchema.safeParse(response.data);

    if (validation.error) {
      toast.error("😓Could not parse server conversion response");
      console.log(validation.error.errors);
      return;
    }
    const validatedData = validation.data;

    setData({
      send_amount: validatedData.amountToReceive,
      processing_fee: validatedData.serviceCharge,
    });
  }, [quotationQuery.data]);

  return (
    <div className="amount">
      <p>You would Get</p>
      <div className="input-container">
        <input
          className="amount-input"
          style={{ borderRadius: "3px", border: "none" }}
          type="number"
          onChange={(e) => handleInput(e)}
          onBlur={handleGetQuotation}
          name="receive_amount"
          value={context?.receive_amount || ""}
        />
        <div className="icon">
          {quotationQuery.isFetching && <div className="lds-hourglass"></div>}
          <p style={{ color: "black" }}>NGN</p>
        </div>
      </div>
    </div>
  );
};

export default FiatInput;
