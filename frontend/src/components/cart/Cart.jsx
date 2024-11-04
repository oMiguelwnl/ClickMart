import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../../redux/reducers/cart";

const Cart = ({ setOpenCard }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data._id));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 flex justify-end">
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] overflow-y-scroll bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCard(false)}
              />
            </div>
            <h5>Carrinho está vazio!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCard(false)}
                />
              </div>

              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} itens
                </h5>
              </div>

              <div className="w-full border-t">
                {cart &&
                  cart.map((item, index) => (
                    <CartSingle
                      key={index}
                      data={item}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t">
              <Link to="/checkout">
                <div className="flex items-center justify-center w-full bg-[#e44343] rounded-[5px] h-[45px] md:h-[50px] text-white font-semibold text-[16px] md:text-[18px]">
                  Finalizar compra (R$ {totalPrice})
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const [totalPrice, setTotalPrice] = useState(data.discountPrice * value);

  useEffect(() => {
    setTotalPrice(data.discountPrice * value);
  }, [value, data.discountPrice]);

  const increment = () => {
    if (data.stock <= value) {
      toast.error("Produto com estoque limitado!");
    } else {
      const newValue = value + 1;
      setValue(newValue);
      quantityChangeHandler({ ...data, qty: newValue });
    }
  };

  const decrement = () => {
    const newValue = value === 1 ? 1 : value - 1;
    setValue(newValue);
    quantityChangeHandler({ ...data, qty: newValue });
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={increment}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={decrement}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            R${totalPrice.toFixed(2)}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
