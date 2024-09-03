import { Link } from "react-router-dom";
import styles from "../../../src/styles/styles";

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
          A Melhor Coleção para <br /> Decoração de Casa
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Encontre peças exclusivas para transformar cada ambiente da sua casa.{" "}
          <br />
          Desde móveis elegantes até pequenos detalhes que fazem a diferença,{" "}
          <br />
          nossa coleção oferece tudo o que você precisa para criar um espaço
          único e acolhedor.
        </p>
        <Link to="/produtos" className="inline-block">
          <div className={`${styles.button} mt-5`}>
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
