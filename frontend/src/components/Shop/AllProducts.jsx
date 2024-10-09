import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const columns = [
    { field: "id", headerName: "ID do Produto", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Nome",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Preço",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Estoque",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Vendido",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Visualização",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productName = params.row.name.replace(/\s+/g, "-");

        return (
          <Link to={`/product/${productName}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Excluir",
      type: "number",
      sortable: false,
      renderCell: () => {
        return (
          <Button>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    name: item.name,
    price: `R$ ${item.discountPrice}`,
    Stock: item.stock,
    sold: 10,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={rows || []}
            columns={columns}
            pageSizeOptions={[10]}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
