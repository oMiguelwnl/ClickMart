import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";

const EventCard = ({ active, data }) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img src={data.images?.[0]?.url || ""} alt={data.name || "Evento"} />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          {data.name || "Nome do Evento"}
        </h2>
        <p>{data.description || "Descrição não disponível."}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice ? `${data.originalPrice} R$` : ""}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice ? `${data.discountPrice} R$` : ""}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out ? `${data.sold_out} vendidos` : ""}
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>Ver mais</div>
          </Link>
          <div
            className={`${styles.button} !w-[180px] text-[#fff] ml-5`}
            // onClick={}
          >
            Adicionar ao carrinho
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
