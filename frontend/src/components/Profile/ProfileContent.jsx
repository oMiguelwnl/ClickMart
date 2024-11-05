import { backend_url, server } from "../../server";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            dispatch(loadUser());
            toast.success("Avatar atualizado com sucesso!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {/* Profile Page */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Nome Completo</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Endereço de E-mail</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Número de Telefone</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(00) 0000-0000"
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">CEP</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Atualizar"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* Order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refound */}
      {active === 3 && (
        <div>
          <AllRefoundOrders />
        </div>
      )}

      {/* Track Order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* User Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "62e1f1e4d0f7d1c6c0a5f3e8",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processando",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID do Pedido", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Entregue" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantidade de Itens",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "R$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefoundOrders = () => {
  const orders = [
    {
      _id: "62e1f1e4d0f7d1c6c0a5f3e8",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processando",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Entregue" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantidade de Itens",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "R$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "62e1f1e4d0f7d1c6c0a5f3e8",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processando",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Entregue" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantidade de Itens",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <MdTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Alterar Senha
      </h1>

      <form
        onSubmit={passwordChangeHandler}
        className="flex flex-col items-center"
      >
        <div className="relative w-full max-w-md mt-5">
          <label className="block pb-2">Digite sua senha antiga</label>
          <input
            type={showOldPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded mb-4"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-4 top-10 cursor-pointer text-gray-500"
          >
            {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <div className="relative w-full max-w-md mt-5">
          <label className="block pb-2">Digite sua nova senha</label>
          <input
            type={showNewPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded mb-4"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-10 cursor-pointer text-gray-500"
          >
            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <div className="relative w-full max-w-md mt-5">
          <label className="block pb-2">Digite sua senha de confirmação</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded mb-4"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-10 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button
          type="submit"
          className={`w-[70%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
        >
          Atualizar
        </button>
      </form>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New Address</span>
        </div>
      </div>
      <br />

      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5>Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>494 Castro Street, San Francisco, CA 94103</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(415) 555-0100</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
