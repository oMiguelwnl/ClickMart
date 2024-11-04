import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/reducers/wishlist";
import { addToCart } from "../../redux/reducers/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] overflow-y-scroll bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>A lista de desejos está vazia!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} itens
                </h5>
              </div>

              <br />
              <div className="w-full border-t">
                {wishlist.map((item) => (
                  <CartSingle
                    key={item._id}
                    data={item}
                    removeFromWishlistHandler={() =>
                      removeFromWishlistHandler(item._id)
                    }
                    addToCartHandler={addToCartHandler}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <RxCross1
            className="cursor-pointer mr-2"
            size={20}
            onClick={removeFromWishlistHandler}
          />
          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-2">
            <h1>{data.name}</h1>
            <h4 className="font-[600] pt-3 text-[17px] text-[#d02222] font-Roboto">
              R${totalPrice.toFixed(2)}
            </h4>
          </div>
        </div>
        <BsCartPlus
          size={20}
          className="cursor-pointer"
          title="Adicionar ao carrinho"
          onClick={() => addToCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
