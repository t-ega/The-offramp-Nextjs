import Logo from "./logo";
import "../../../header.css";
import Button from "../../button";
import { LandingProps } from "./landing";

const Header = (props: LandingProps) => {
  const { openModal, openLoginModal } = props;
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <div className="nav-bar" id="navigation-bar">
        <a href="/" className="link-item">
          Home
        </a>
        <a href="#get-started" className="link-item">
          Buy Crypto
        </a>
        <a href="#faq" className="link-item">
          FAQ
        </a>
        {token && (
          <a href="/transactions" className="link-item">
            Transactions
          </a>
        )}
      </div>
      {token ? (
        <Button content={"Convert"} onClick={openModal} variant="large" />
      ) : (
        <Button content={"Login"} onClick={openLoginModal} variant="large" />
      )}
    </div>
  );
};

export default Header;
