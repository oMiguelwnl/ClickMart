import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/reducers/wishlist";
import { addToCart } from "../../../redux/reducers/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    name,
    images,
    originalPrice,
    discountPrice,
    shop,
    sold_out,
    ratings,
    stock,
  } = data;

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data._id));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((item) => item._id === id);

    if (isItemExists) {
      toast.error("Item já está no carrinho");
    } else if (1 > stock) {
      toast.error("Não há estoque suficiente");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item adicionado ao carrinho");
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link
          to={`${
            isEvent === true
              ? `/produto/${data._id}?isEvent=true`
              : `/produto/${data._id}`
          }`}
        >
          <img
            src={`${images && images[0]?.url}`}
            alt="Produto"
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{shop.name}</h5>
        </Link>

        <Link
          to={`${
            isEvent === true
              ? `/produto/${data._id}?isEvent=true`
              : `/produto/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {name.length > 40 ? name.slice(0, 40) + "..." : name}
          </h4>
        </Link>

        <div className="flex">
          <Ratings rating={ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {originalPrice === 0 ? originalPrice : discountPrice}$
            </h5>
            <h4 className={`${styles.price}`}>
              {originalPrice ? originalPrice + " R$" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {sold_out === 1
              ? "1 vendido"
              : sold_out === 0
              ? "0 vendidos"
              : `${sold_out} vendidos`}
          </span>
        </div>

        {/* Side Options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remover dos favoritos"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Adicionar aos favoritos"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Visualização rápida"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Adicionar ao carrinho"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
