import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1. Envio</span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
        </div>

        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              2. Pagamento
            </span>
          </div>
        </div>

        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 3
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              3. Sucesso
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentButton = ({ paymentSubmit }) => {
  return (
    <div
      className={`${styles.button} w-[200px] sm:w-[250px] md:w-[280px] lg:w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer`}
      onClick={paymentSubmit}
    >
      <h5 className="text-white">Ir para o pagamento</h5>
    </div>
  );
};

export default CheckoutSteps;
export { PaymentButton };
