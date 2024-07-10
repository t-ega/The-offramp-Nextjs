import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../../utils/checkout-content";
import { useQueries } from "@tanstack/react-query";
import { fetchCryptoCurrencies, getQuotations } from "../../../utils/queries";
import {
  CurrencyListSchema,
  CurrencyType,
} from "../../../utils/validation/currency-list";
import { toast } from "react-toastify";

import { CheckoutDetails } from "../../../types";
import { QuotationSchema } from "../../../utils/validation/market-price";
import apiRequest from "../../../utils/api-request";

export interface CryptoProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setData: (e: Partial<CheckoutDetails>) => void;
}

const CryptoInput = (props: CryptoProps) => {
  const { handleInput, setData } = props;
  const context = useContext(CheckoutContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const [cryptocurrencies, setCryptocurrencies] = useState<CurrencyType[]>([]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCryptoSelect = (crypto: CurrencyType) => {
    setData({
      from_currency: crypto.currency,
      crypto_name: crypto.shortName,
      crypto_display_name: crypto.display_name,
    });
    setShowDropdown(false);
  };

  const handleGetQuotation = () => {
    if (!context?.send_amount) return;
    const valid = parseFloat(context?.send_amount.toString());

    if (!valid) {
      toast.error("Please ensure you passed a valid amount");
      return;
    }

    quotationQuery.refetch();
  };

  const [currenciesQuery, quotationQuery] = useQueries({
    queries: [
      {
        queryKey: ["availableCurrencies"],
        queryFn: () => fetchCryptoCurrencies(),
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["quotationCrypto", context?.from_currency],
        queryFn: () =>
          getQuotations({
            vol: context?.send_amount!,
            quote_type: "send",
            currency: context?.from_currency!,
          }),

        enabled: !!context?.send_amount,
        retry: false,
        refetchOnMount: false,
      },
    ],
  });

  useEffect(() => {
    const response = currenciesQuery.data?.data;
    if (!response) return;

    const validation = CurrencyListSchema.safeParse(response);

    if (validation.error) {
      toast.error("😓 Could not parse server currencies response", {
        icon: false,
        toastId: "2",
      });
      return;
    }

    setCryptocurrencies(validation.data);

    const selecetedCurrency =
      validation.data.find((e) => e.shortName == context?.crypto_name) ||
      validation.data[0];
    handleCryptoSelect(selecetedCurrency);
  }, [currenciesQuery.data]);

  useEffect(() => {
    const response = quotationQuery?.data;
    if (!response) return;

    const validation = QuotationSchema.safeParse(response.data);

    if (validation.error) {
      toast.error("😓Could not parse server conversion response");
      return;
    }
    const validatedData = validation.data;

    setData({
      receive_amount: validatedData.amountToReceive,
      processing_fee: validatedData.serviceCharge,
      currency_price: validatedData.marketPrice,
    });
  }, [quotationQuery.data]);

  useEffect(() => {
    if (currenciesQuery.error) {
      toast.error("Unable to fetch currencies", { toastId: "3" });
    }

    if (quotationQuery.error) {
      const msg = apiRequest.formatApiErrorMessage(quotationQuery.error);
      toast.error(msg, { toastId: 1 });
      // Reset context data
      setData({
        send_amount: undefined,
        receive_amount: undefined,
        processing_fee: undefined,
      });
    }
  }, [currenciesQuery.error, quotationQuery.error]);

  return (
    <div className="amount">
      <p>Send</p>
      <div className="input-container">
        <input
          className="amount-input"
          style={{ borderRadius: "3px", border: "none" }}
          type="number"
          onChange={(e) => handleInput(e)}
          onBlur={handleGetQuotation}
          name="send_amount"
          value={context?.send_amount || ""}
        />
        <div
          className="icon"
          style={{}}
          onClick={() => {
            if (currenciesQuery.data) {
              return handleDropdownToggle();
            }
          }}
        >
          {currenciesQuery.isFetching || quotationQuery.isFetching ? (
            <div className="lds-hourglass"> </div>
          ) : (
            <>
              ▼<p style={{ color: "black" }}>{context?.crypto_name}</p>
            </>
          )}
        </div>
      </div>
      {showDropdown && (
        <div className="dropdown">
          {cryptocurrencies.map((crypto, id) => (
            <div
              key={id}
              className="dropdown-item"
              onClick={() => handleCryptoSelect(crypto)}
            >
              {crypto.shortName || "------"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoInput;
