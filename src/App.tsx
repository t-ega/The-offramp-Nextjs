import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./modalStyles.css"; // Ensure to import the CSS styles
import CheckOutModal from "./components/screens/checkout/checkout-modal";
import { useState } from "react";
import Landing from "./components/screens/home/landing";
import Button from "./components/button";
import DollarCoin from "./assets/dollar-coin.png";

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="contents">
        <CheckOutModal isVisible={isModalVisible} onClose={handleModalClose} />
        <Landing openModal={() => setModalVisible(true)} />
      </div>
      <div className="footer">
        <div style={{ width: "700px" }}>
          <div className="floating">
            <img src={DollarCoin} className="floating-coin" />
          </div>
          <h1 className="heading">Start your Cryptocurrency Journey</h1>
          <p className="paragraph">
            Crypto is money, it should be treated like one. No need to go
            through so many fees just to liquidate your assests. Lets do it for
            you!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <Button
              onClick={() => setModalVisible(true)}
              content={<p className="special_inner">Get Started</p>}
              variant="special"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
