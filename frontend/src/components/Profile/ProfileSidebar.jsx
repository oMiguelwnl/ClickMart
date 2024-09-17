import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    icon: <HiOutlineShoppingBag size={20} />,
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
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {menuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(menuItem.id)}
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
