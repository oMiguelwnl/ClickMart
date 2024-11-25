import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <>
        {data && data?.status === "Processando" ? (
          <h1 className="text-[20px]">
            Seu pedido está sendo processado na loja.
          </h1>
        ) : data?.status === "Transferido para o parceiro de entrega" ? (
          <h1 className="text-[20px]">
            Seu pedido foi transferido para o parceiro de entrega.
          </h1>
        ) : data?.status === "Enviando" ? (
          <h1 className="text-[20px]">
            Seu pedido está a caminho com nosso parceiro de entrega.
          </h1>
        ) : data?.status === "Recebido" ? (
          <h1 className="text-[20px]">
            Seu pedido está na sua cidade. Nosso entregador irá entregá-lo.
          </h1>
        ) : data?.status === "A caminho" ? (
          <h1 className="text-[20px]">
            Nosso entregador está a caminho para entregar seu pedido.
          </h1>
        ) : data?.status === "Entregue" ? (
          <h1 className="text-[20px]">Seu pedido foi entregue!</h1>
        ) : data?.status === "Processando reembolso" ? (
          <h1 className="text-[20px]">Seu reembolso está sendo processado!</h1>
        ) : data?.status === "Reembolso bem-sucedido" ? (
          <h1 className="text-[20px]">Seu reembolso foi bem-sucedido!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
