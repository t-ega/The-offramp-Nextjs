import ErrorPng from "../assets/vecteezy_3d-rendering-exclamation-mark-sign-icon_10950671.png";

const ErrorBoundary = () => {
  return (
    <div className={`modal-backdrop`}>
      <div className="checkout">
        <div style={{ textAlign: "center", color: "white", margin: "20px 0" }}>
          An unexpected error occurred
        </div>
        <img src={ErrorPng} style={{ width: "400px", height: "400px" }} />
      </div>
    </div>
  );
};

export default ErrorBoundary;
