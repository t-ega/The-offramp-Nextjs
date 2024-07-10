import { CheckoutDetails, CheckoutModal } from "../../../types";
import "../../../checkout.css";
import Button from "../../button";
import ConfirmPayment from "../checkout/confirm-payment";
import EntryCard from "./entry-card";
import PaymentDetails from "./payment-details";

import { Summary } from "../checkout/summary";
import React, { useState } from "react";
import { PayoutSchema } from "../../../utils/validation/payout";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createPayout } from "../../../utils/mutations";
import apiRequest from "../../../utils/api-request";
import { CheckoutContext } from "../../../utils/checkout-content";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../utils/endpoints";

const CheckOutModal = (props: CheckoutModal) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { isVisible, onClose } = props;
  const navigate = useNavigate();

  const payoutMutation = useMutation({
    mutationFn: createPayout,
  });

  const displayErrors = (errors: string[] | string) => {
    if (Array.isArray(errors)) {
      errors.map((e) => toast.error(e));
      return;
    }
    toast.error(errors);
  };

  const [currentContext, setCurrentContext] = useState<CheckoutDetails>();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCurrentContext((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setData = (data: Partial<CheckoutDetails>) => {
    setCurrentContext((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const validatePayout = () => {
    const bank_details = {
      bank_code: currentContext?.bank_code,
      account_number: currentContext?.account_number,
    };

    const validData = PayoutSchema.safeParse({
      ...currentContext,
      from_currency: currentContext?.crypto_name,
      from_amount: currentContext?.send_amount,
      bank_details,
    });

    if (validData.error) {
      toast.warning("Please re-check all fields and confirm the input");
      return;
    }

    payoutMutation.mutate(validData.data, {
      onError: (err) => {
        const msg = apiRequest.formatApiErrorMessage(err);
        displayErrors(msg);
      },
      onSuccess: (response) => {
        const public_id = response.data.data.public_id;
        navigate(ENDPOINTS.FRONTEND.PAYMENT_STATUS(public_id));
        toast.success("Waiting to confirm deposit");
      },
    });
  };

  const currentCard = () => {
    switch (currentStep) {
      case 1:
        return <EntryCard handleInput={handleInput} setData={setData} />;
      case 2:
        return <PaymentDetails handleInput={handleInput} setData={setData} />;
      case 3:
        return <ConfirmPayment />;
      default:
        return <EntryCard handleInput={handleInput} setData={setData} />;
    }
  };

  return (
    <CheckoutContext.Provider value={currentContext}>
      <div className={`modal-backdrop ${isVisible ? "" : "hidden"}`}>
        <div className="checkout">
          <div>
            <Button
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep((prev) => (prev -= 1));
                } else {
                  onClose();
                }
              }}
              content={
                <img
                  src="https://img.icons8.com/?size=12&id=99266&format=png&color=000000&rotation=180"
                  alt="arrow-back"
                  className="arrow-back"
                />
              }
            />
          </div>

          {currentCard()}

          <Summary />
          <Button
            content={currentStep < 3 ? `Continue` : "I want to proceed"}
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep((prev) => (prev += 1));
                return;
              }

              validatePayout();
            }}
            executing={payoutMutation.isPending}
            variant="full"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            Step {currentStep} of 3
          </div>
        </div>
      </div>
    </CheckoutContext.Provider>
  );
};

export default CheckOutModal;
