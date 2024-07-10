import NotFoundPng from "../assets/vecteezy_404-error-with-man_24096139.png";

const NotFound = () => {
  return (
    <div className={`modal-backdrop`}>
      <div className="checkout">
        <div style={{ textAlign: "center", color: "white", margin: "20px 0" }}>
          The page you are looking for cannot be found
        </div>
        <img src={NotFoundPng} style={{ width: "400px", height: "400px" }} />
      </div>
    </div>
  );
};

export default NotFound;
