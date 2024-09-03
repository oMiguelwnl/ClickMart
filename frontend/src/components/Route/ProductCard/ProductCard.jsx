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

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const nomeProduto = data.name.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${nomeProduto}`}>
          <img
            src={data.image_Url[0].url}
            alt="produto"
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>

        <Link to={`/product/${nomeProduto}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
        </Link>

        <div className="flex">
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
          />
          <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00" />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.price === 0 ? data.price : data.discount_price} R$
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? data.price + " R$" : null}
            </h4>
          </div>
          <span className="font-[400] text-[15px] text-[#68d284]">
            {data.total_sell} vendidos
          </span>
        </div>

        {/* SideOptions*/}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remover dos favoritos"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
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
            onClick={() => setClick(!click)}
            color="#444"
            title="Adicionar ao carrinho"
          />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
