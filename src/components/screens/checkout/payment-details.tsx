import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../../utils/checkout-content";
import { ICheckoutProps } from "../../../types";
import { useQueries } from "@tanstack/react-query";
import { listBanks, resolveBank } from "../../../utils/queries";
import { BanksSchema, BankType } from "../../../utils/validation/banks";
import { toast } from "react-toastify";
import apiRequest from "../../../utils/api-request";

const PaymentDetails = (props: ICheckoutProps) => {
  const context = useContext(CheckoutContext);
  const { handleInput, setData } = props;
  const [banksList, setBanksList] = useState<BankType>();

  const [banksQuery, resolveBankQuery] = useQueries({
    queries: [
      {
        queryKey: ["listBanks"],
        queryFn: () => listBanks(),
        staleTime: 1000 * 60 * 60 * 5,
      },
      {
        queryKey: ["account", context?.account_number],
        queryFn: () =>
          resolveBank({
            bank_code: context?.bank_code!,
            account_number: context?.account_number!,
          }),
        refetchOnMount: false,
        enabled: false,
        retry: false,
      },
    ],
  });

  useEffect(() => {
    const res = banksQuery.data;
    if (!res) return;

    const parseBanks = BanksSchema.safeParse(res.data.data);
    if (parseBanks.error) {
      toast.error("Unable to display available banks");
      return;
    }

    setBanksList(parseBanks.data);
  }, [banksQuery.data]);

  useEffect(() => {
    const res = resolveBankQuery.data;
    if (!res) return;

    const data = res.data.data;
    setData({ account_name: data.account_name });
  }, [resolveBankQuery.data]);

  const displayErrors = (errors: string[] | string) => {
    if (Array.isArray(errors)) {
      errors?.map((error) => toast.error(error, { toastId: 8 }));
      return;
    }
    toast.error(`${errors}`, { toastId: 8 });
  };

  if (resolveBankQuery.error) {
    const msg = apiRequest.formatApiErrorMessage(resolveBankQuery.error);
    displayErrors(msg);
  }

  return (
    <div>
      <h2 style={{ color: "white" }}>Payment Details</h2>
      <div>
        <div className="bank-entry">
          <div className="bank_entry__item">
            <p className="info">Select your bank</p>
            <select
              name="bank_code"
              onChange={(e) => {
                handleInput(e);
                context?.account_number && resolveBankQuery.refetch();
              }}
              value={context?.bank_code || "---"}
              style={{ color: "black", padding: "10px" }}
              className="bank-info"
              id=""
            >
              {banksList &&
                banksList.map((bank, idx) => (
                  <option key={idx} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="bank_entry__item">
            <p className="info">Account Number</p>
            <div className="input-container">
              <input
                type="number"
                name="account_number"
                className="bank-info"
                value={context?.account_number || ""}
                onChange={(e) => handleInput(e)}
                onBlur={() => {
                  if (context?.account_number) {
                    setData({ account_name: "" });
                    resolveBankQuery.refetch();
                  }
                }}
              />
              <div className="icon">
                {resolveBankQuery.isFetching && (
                  <div className="lds-hourglass"></div>
                )}
              </div>
            </div>
          </div>
          <div className="bank_entry__item">
            <p className="info">Receipient Email</p>
            <input
              name="receipient_email"
              type="email"
              required
              value={context?.receipient_email}
              onChange={(e) => handleInput(e)}
              className="bank-info"
            />
          </div>
          <div className="bank_entry__item">
            <p className="info">Name on account</p>
            <input
              type="text"
              value={context?.account_name}
              disabled
              className="bank-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
