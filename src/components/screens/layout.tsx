import { PropsWithChildren, useState } from "react";
import Header from "./home/header";
import { Login } from "./auth/login";
import CheckOutModal from "./checkout/checkout-modal";

const Layout = (props: PropsWithChildren) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header
        openModal={() => setModalVisible(true)}
        openLoginModal={() => setIsLoginVisible(true)}
      />
      <Login
        isVisible={isLoginVisible}
        closeModal={() => setIsLoginVisible(false)}
      />
      <CheckOutModal isVisible={isModalVisible} onClose={handleModalClose} />

      {props.children}
    </>
  );
};

export default Layout;
