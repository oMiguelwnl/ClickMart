import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          A Melhor Selecção para <br /> Seu Estilo de Vida
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Descubra opções únicas para adicionar um toque especial ao seu dia a
          dia. <br />
          De produtos modernos a acessórios inovadores, <br />
          nossa coleção oferece tudo o que você precisa para transformar sua
          rotina.
        </p>
        <Link to="/produtos" className="inline-block">
          <div className={`${styles.button} mt-5 !w-[170px]`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Compre Agora
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
