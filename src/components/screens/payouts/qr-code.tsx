import QRCode from "react-qr-code";
import Button from "../../button";
import { toast } from "react-toastify";

type QrCodeProps = {
  data: string;
};

const QrCodeDisplay = (props: QrCodeProps) => {
  const { data } = props;

  const copyAddress = () => {
    navigator.clipboard.writeText(data);
    toast.success("Address copied");
  };

  return (
    <div style={{ margin: "30px 0" }}>
      <div className="address-info">
        <div className="address-info__inner">
          <h3>Deposit Address</h3>
          <p>{data}</p>
        </div>
        <Button variant="rounded" content={"Copy"} onClick={copyAddress} />
      </div>
      <div className="qr-code">
        <QRCode value={data} width={"100%"} fgColor={"white"} bgColor="black" />
      </div>
    </div>
  );
};

export default QrCodeDisplay;
