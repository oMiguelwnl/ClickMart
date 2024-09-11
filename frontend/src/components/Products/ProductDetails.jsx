import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=75523234dc1");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* Left Column */}
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[select].url} alt="produto" />
                <div className="w-full flex ">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt="produto"
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt="produto"
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              {/* right column */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="text-[15px] pt-3">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price} R$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + " R$" : null}
                  </h3>
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
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remover dos favoritos"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        title="Adicionar aos favoritos"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} w-[200px] mt-6 rounded h-11 flex items-center`}
                >
                  <span className="text-[#fff] flex items-center">
                    Adicionar ao carrinho{" "}
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="loja"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />

                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt -1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Avaliações
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] w-[160px] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Enviar Mensagem <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Detalhes do Produto
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Avaliações do Produto
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Informações do Vendedor
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Os detalhes do produto são uma parte crucial de qualquer site de
            eCommerce ou mercado online. Esses detalhes ajudam os clientes
            potenciais a tomar uma decisão informada sobre o produto que estão
            interessados em comprar. Uma descrição bem escrita do produto também
            pode ser uma ferramenta de marketing poderosa que pode ajudar a
            aumentar as vendas. Os detalhes do produto geralmente incluem
            informações sobre as características, especificações, dimensões,
            peso, materiais e outras informações relevantes que podem ajudar os
            clientes a entender melhor o produto. A seção de detalhes do produto
            também deve incluir imagens e vídeos de alta qualidade do produto,
            bem como avaliações e classificações dos clientes.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Esses detalhes ajudam os clientes potenciais a tomar uma decisão
            informada sobre o produto que estão interessados em comprar. Uma
            descrição bem escrita do produto também pode ser uma ferramenta de
            marketing poderosa que pode ajudar a aumentar as vendas. Os detalhes
            do produto geralmente incluem informações sobre as características,
            especificações, dimensões, peso, materiais e outras informações
            relevantes que podem ajudar os clientes a entender melhor o produto.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Esses detalhes ajudam os clientes potenciais a tomar uma decisão
            informada sobre o produto que estão interessados em comprar. Uma
            descrição bem escrita do produto também pode ser uma ferramenta de
            marketing poderosa que pode ajudar a aumentar as vendas. Os detalhes
            do produto geralmente incluem informações sobre as características,
            especificações, dimensões, peso, materiais e outras informações
            relevantes que podem ajudar os clientes a entender melhor o produto.
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>Ainda sem avaliações!</p>
        </div>
      ) : null}

      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data?.shop?.shop_avatar?.url || ""}
                className="w-[50px] h-[50px] rounded-full"
                alt="loja"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Avaliações
                </h5>
              </div>
            </div>

            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
              adipisci explicabo, possimus dolore dolorum totam consequuntur, ut
              temporibus iusto, aperiam optio dolor ea aut. Consequatur corrupti
              illo harum nam et!
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Entrou em: <span className="font-[500]">11 setembro, 2024</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total de Produtos: <span className="font-[500]">1.324</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total de Avaliações: <span className="font-[500]">324</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visitar Loja</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
