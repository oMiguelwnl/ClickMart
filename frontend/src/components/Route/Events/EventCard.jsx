import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ data }) => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12 `}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://cdn.dxomark.com/wp-content/uploads/medias/post-155689/Apple-iPhone-15-Pro-Max_-blue-titanium_featured-image-packshot-review.jpg"
          alt="imagem do produto"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          IPhone 14 pro max 8/256gb amazon
        </h2>
        <p>
          Descubra o poder e a elegância do novo Apple iPhone 15 Pro Max na
          deslumbrante cor Blue Titanium. Com um design inovador, este
          smartphone combina a resistência e a leveza do titânio com a
          sofisticação de um acabamento azul exclusivo. O iPhone 15 Pro Max
          oferece uma experiência incomparável com sua tela Super Retina XDR de
          última geração, desempenho ultrarrápido graças ao chip A17 Bionic, e
          um sistema de câmeras profissionais que captura cada detalhe com
          precisão.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              7500$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              6000R$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            315 Vendidos
          </span>
        </div>
        <CountDown data={data} />
      </div>
    </div>
  );
};

export default EventCard;
