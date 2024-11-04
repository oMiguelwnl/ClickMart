import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/reducers/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/reducers/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const {
    name,
    description,
    discountPrice,
    originalPrice,
    images,
    shop,
    sold_out,
    reviews,
    stock,
  } = data || {};

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((item) => item._id === id);

    if (isItemExists) {
      toast.error("Item já está no carrinho");
    } else if (count > stock) {
      toast.error("Não há estoque suficiente");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Item adicionado ao carrinho");
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data._id));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={images && images[0]?.url}
                  alt="produto"
                  className="w-full h-auto"
                />

                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={shop?.avatar?.url}
                      alt="avatar"
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>{shop?.name}</h3>
                      <h5 className="pb-3 text-[15px]">
                        {" "}
                        ({reviews.length}) Avaliações
                      </h5>
                    </div>
                  </Link>
                </div>

                <div
                  className={`${styles.button} bg-[#000] w-[160px] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Enviar Mensagem <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({sold_out}) vendidos
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>{name}</h1>
                <p className="mt-3">{description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {discountPrice} R$
                  </h4>
                  {originalPrice && (
                    <h3 className={`${styles.price}`}>{originalPrice} R$</h3>
                  )}
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remover dos favoritos"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Adicionar aos favoritos"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} bg-[#000] w-[180px] mt-4 rounded-[4px] h-11`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Adicionar ao carrinho{" "}
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
