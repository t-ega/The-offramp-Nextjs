import TypeIt from "typeit-react";
import Button from "../../button";
import Coin from "../../../assets/vecteezy_3d-illustration-exchange-ethereum-with-dollars_10877409.png";
import { LandingProps } from "./landing";

const Hero = (props: LandingProps) => {
  const { openModal } = props;

  const playEffect = () => {
    return (
      <TypeIt
        options={{
          loop: true,
          deleteSpeed: 100,
        }}
        getBeforeInit={(instance) => {
          instance
            .type("crypto")
            .pause(3000)
            .delete("")
            .type("btc")
            .pause(3000)
            .delete("")
            .type("usdt")
            .pause(3000)
            .delete("")
            .type("eth")
            .pause(3000)
            .delete("")
            .type("ltc")
            .pause(3000);

          return instance;
        }}
      />
    );
  };

  return (
    <div className="hero">
      <section className="hero__content">
        <div className="hero__container">
          <div className="hero__display">
            <h1 className="heading">
              The easiest and fastest way to instantly convert your{" "}
              <span className="highlight">{playEffect()} to cash.</span> We do
              it in <span className="circle-sketch-highlight">3 mins</span>{" "}
              literaly!
            </h1>
            <p className="paragrah">
              We are not an exchange we just help you liquidate your current
              crypto assests and get value in less than 3 mins
            </p>
          </div>
          <div className="hero__cta">
            <Button
              content={"Get started"}
              onClick={openModal}
              variant="full"
            />
            <Button content={"Talk to us"} variant="outline" />
          </div>
        </div>
        <div className="hero__icons">
          <img src={Coin} className="currency-icon" alt="ether__icon" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
