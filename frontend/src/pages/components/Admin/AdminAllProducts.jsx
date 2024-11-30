import { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { server } from "../../../server";
import { Button } from "@mui/material";

const AdminAllProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.6 },
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
      headerName: "Vendidos",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Visializar",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/produto/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = data?.map((item) => ({
    id: item._id,
    name: item.name,
    price: "R$ " + item.discountPrice,
    Stock: item.stock,
    sold: item?.sold_out,
  }));

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default AdminAllProducts;
