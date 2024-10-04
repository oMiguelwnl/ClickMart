import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);

  const logoutHandler = () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex item-center justify-center">
            <img
              src={`${seller.avatar?.url}`}
              alt="Avatar"
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {seller.description}
          </p>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Endereço</h5>
          <h4 className="text-[#000000a6]">{seller.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Número de Telefone</h5>
          <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Total de Produtos</h5>
          <h4 className="text-[#000000a6]">10</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Avaliação da Loja</h5>
          <h4 className="text-[#000000b0]">4/5</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Membro Desde</h5>
          <h4 className="text-[#000000a6]">
            {seller.createdAt ? formatDate(seller.createdAt) : ""}
          </h4>
        </div>

        {isOwner && (
          <div className="py-3 px-4">
            <Link to="settings">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Editar Loja</span>
              </div>
            </Link>

            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white" onClick={logoutHandler}>
                Sair
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
