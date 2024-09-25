import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const menuItems = [
  {
    id: 1,
    icon: <RxPerson size={20} />,
    text: "Perfil",
    activeColor: "red",
  },
  {
    id: 2,
    icon: <HiOutlineShoppingBag size={20} />,
    text: "Pedidos",
    activeColor: "red",
  },
  {
    id: 3,
    icon: <HiOutlineReceiptRefund size={20} />,
    text: "Reembolsos",
    activeColor: "red",
  },
  {
    id: 4,
    icon: <AiOutlineMessage size={20} />,
    text: "Caixa de Entrada",
    activeColor: "red",
  },
  {
    id: 5,
    icon: <MdOutlineTrackChanges size={20} />,
    text: "Rastrear Pedido",
    activeColor: "red",
  },
  {
    id: 6,
    icon: <RiLockPasswordLine size={20} />,
    text: "Alterar Senha",
    activeColor: "red",
  },
  {
    id: 7,
    icon: <TbAddressBook size={20} />,
    text: "Endereço",
    activeColor: "red",
  },
  {
    id: 8,
    icon: <AiOutlineLogin size={20} />,
    text: "Desconectar",
    activeColor: "red",
  },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {menuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => {
            if (menuItem.id === 8) {
              logoutHandler();
            } else {
              setActive(menuItem.id);
            }
          }}
        >
          <span
            className={`${
              active === menuItem.id ? `text-[${menuItem.activeColor}]` : ""
            }`}
          >
            {menuItem.icon}
          </span>
          <span
            className={`pl-3 ${
              active === menuItem.id ? `text-[${menuItem.activeColor}]` : ""
            } 800px:block hidden`}
          >
            {menuItem.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
