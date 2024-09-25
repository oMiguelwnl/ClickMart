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
import React from "react";

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

  const menuItems = [
    {
      id: 1,
      icon: <RxPerson size={20} />,
      text: "Perfil",
      onClick: () => setActive(1),
    },
    {
      id: 2,
      icon: <HiOutlineShoppingBag size={20} />,
      text: "Pedidos",
      onClick: () => setActive(2),
    },
    {
      id: 3,
      icon: <HiOutlineReceiptRefund size={20} />,
      text: "Reembolsos",
      onClick: () => setActive(3),
    },
    {
      id: 4,
      icon: <AiOutlineMessage size={20} />,
      text: "Caixa de Entrada",
      onClick: () => setActive(4) || navigate("/inbox"),
    },
    {
      id: 5,
      icon: <MdOutlineTrackChanges size={20} />,
      text: "Rastrear Pedido",
      onClick: () => setActive(5),
    },
    {
      id: 6,
      icon: <RiLockPasswordLine size={20} />,
      text: "Alterar Senha",
      onClick: () => setActive(6),
    },
    {
      id: 7,
      icon: <TbAddressBook size={20} />,
      text: "Endereço",
      onClick: () => setActive(7),
    },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={item.onClick}
        >
          {React.cloneElement(item.icon, {
            color: active === item.id ? "red" : "",
          })}
          <span
            className={`pl-3 ${
              active === item.id ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            {item.text}
          </span>
        </div>
      ))}

      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 9 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 9 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
