import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import socketIO from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_SOCKET_URL;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import { FiUpload } from "react-icons/fi";

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          { withCredentials: true }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.error(error);
      }
    };
    if (seller) getConversation();
  }, [seller]);

  useEffect(() => {
    if (seller) {
      socketId.emit("addUser", seller._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    return onlineUsers.some((user) => user.userId === chatMembers);
  };

  useEffect(() => {
    const getMessage = async () => {
      if (currentChat) {
        try {
          const response = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        message
      );
      setMessages((prev) => [...prev, res.data.message]);
      updateLastMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateLastMessage = async (lastMessage) => {
    socketId.emit("updateLastMessage", {
      lastMessage,
      lastMessageId: seller._id,
    });

    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        { lastMessage, lastMessageId: seller._id }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImages(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            Todas as conversas
          </h1>
          {conversations.map((item, index) => (
            <MessageList
              key={index}
              data={item}
              index={index}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              me={seller._id}
              setUserData={setUserData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              isLoading={isLoading}
            />
          ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  setOpen,
  setCurrentChat,
  me,
  online,
  setActiveStatus,
  setUserData,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, setUserData]);

  const handleChatClick = () => {
    setCurrentChat(data);
    setOpen(true);
    setActiveStatus(online);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `Agora`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""} atrás`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hora${diffInHours > 1 ? "s" : ""} atrás`;
    } else {
      return `${diffInDays} dia${diffInDays > 1 ? "s" : ""} atrás`;
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-3 my-2 border-b cursor-pointer hover:bg-gray-100 rounded ${
        online ? "bg-green-100" : ""
      }`}
      onClick={handleChatClick}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          {user ? (
            <img
              src={user.avatar.url}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{user ? user.name.charAt(0) : "?"}</span>
          )}
        </div>
        <div className="ml-3">
          <h2 className="font-semibold">
            {user ? user.name : "Carregando..."}
          </h2>
          <p className="text-sm text-gray-600">
            {data?.lastMessage?.length > 30
              ? `${data.lastMessage.substring(0, 30)}...`
              : data?.lastMessage}
          </p>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <span>{formatDate(data?.updatedAt)}</span>
        <AiOutlineArrowRight className="ml-2" />
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  console.log(userData);
  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);

    if (isNaN(messageTime)) {
      return "Data inválida";
    }

    const diffInMs = now - messageTime;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
      return "Agora";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    } else if (diffInHours < 24) {
      return `${diffInHours} h atrás`;
    } else if (diffInDays < 30) {
      return `${diffInDays} d atrás`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} mês${diffInMonths > 1 ? "es" : ""} atrás`;
    } else {
      return `${diffInYears} ano${diffInYears > 1 ? "s" : ""} atrás`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <img
              src={userData?.avatar.url}
              alt={userData?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">{userData?.name}</h2>
            <p className="text-sm text-gray-600">
              {activeStatus ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          className="p-2 bg-red-500 text-white rounded"
          onClick={() => setOpen(false)}
        >
          Fechar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === sellerId ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === sellerId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {formatTime(message.createdAt)}
              </span>
            </div>
          ))
        ) : (
          <p>Sem mensagens</p>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleImageUpload}
        />
        <label htmlFor="fileInput" className="p-2 cursor-pointer">
          <FiUpload />
        </label>
        <input
          type="text"
          className="w-full p-2 ml-2 border border-gray-300 rounded"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="p-2 ml-2 bg-blue-500 text-white rounded"
          onClick={sendMessageHandler}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default DashboardMessages;
