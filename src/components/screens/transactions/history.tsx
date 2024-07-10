import "../../../transaction.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../../../utils/queries";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>();

  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactionHistory(),
    staleTime: 1000 * 60 * 5,
  });

  const buildUrl = (public_id: string) => {
    return `/payment/confirm/${public_id}`;
  };

  useEffect(() => {
    const data = transactionsQuery.data;
    if (!data) return;

    setTransactionHistory(data.data.data);
  }, [transactionsQuery.data]);

  let NGN = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  if (transactionsQuery.isFetching) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <section className="transaction_section">
          <h1 style={{ textAlign: "center", color: "white" }}>
            Latest Transactions
          </h1>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "100px",
            }}
          >
            <Skeleton width={"100px"} height={"100px"} circle />
            <Skeleton containerClassName="w-50" height={"100px"} />
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  return (
    <section className="transaction_section">
      <h1 style={{ textAlign: "center", color: "white" }}>
        Latest Transactions
      </h1>
      {transactionHistory?.length ? (
        transactionHistory.map((transaction, idx) => (
          <details key={idx} className="transaction_details">
            <summary className="transaction_summary">
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=46164&format=png&color=000000"
                  style={{ marginRight: "10px" }}
                />
                <h3>
                  <strong>Offramp Withdrawal</strong>
                  <small style={{ margin: "10px 0" }}>
                    <a href={buildUrl(transaction.public_id)}>View Status</a>
                  </small>
                  <small>{transaction.status.toUpperCase()}</small>
                </h3>
                {transaction.to_amount ? (
                  <span className="plus">
                    {NGN.format(transaction.to_amount)}
                  </span>
                ) : (
                  <span>
                    {transaction.from_amount}{" "}
                    {transaction.from_currency.toUpperCase()}
                  </span>
                )}
              </div>
            </summary>
            <div className="history_details">
              <div>
                <h3>Time</h3>
                <p>{transaction.created_at.toString()}</p>
              </div>

              <div>
                <h3>Receipient Email</h3>
                <p>{transaction.receipient_email}</p>
              </div>

              <div>
                <h3>Account Number</h3>
                <p>{transaction.account_details.account_number}</p>
              </div>
              <div>
                <h3>Bank Code</h3>
                <p>{transaction.account_details.bank_code}</p>
              </div>
              <div>
                <h3>Account Details</h3>
                <p>{transaction.account_details.account_number}</p>
              </div>
              <div>
                <h3>Payment Address</h3>
                <p style={{ fontSize: "small", textWrap: "wrap" }}>
                  {transaction.payment_address}
                </p>
              </div>
              <div>
                <h3>Payout Reference</h3>
                <p>{transaction.payout_reference}</p>
              </div>
            </div>
          </details>
        ))
      ) : (
        <summary className="transaction_summary">
          <div>
            <img
              src="https://img.icons8.com/?size=100&id=46164&format=png&color=000000"
              style={{ marginRight: "10px" }}
            />
            <h3>
              <strong style={{ color: "white" }}>
                So empty in here! Place your first transaction and come back
                here to track it!
              </strong>
            </h3>
          </div>
        </summary>
      )}
    </section>
  );
};

export default History;

interface Transaction {
  public_id: string;
  from_currency: string;
  to_currency: string;
  to_amount: number;
  payout_reference: string;
  status: string;
  payment_address: string;
  network: string;
  receipient_email: string;
  account_details: { bank_code: string; account_number: string };
  from_amount: number;
  created_at: Date;
}
