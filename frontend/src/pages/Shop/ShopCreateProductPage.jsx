import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct.jsx";

const ShopCreateProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full justify-between items-center">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="flex justify-center w-full">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProductPage;
