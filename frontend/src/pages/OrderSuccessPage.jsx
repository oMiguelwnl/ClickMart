import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../assets/animations/107043-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Seu pedido foi feito com sucesso 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
