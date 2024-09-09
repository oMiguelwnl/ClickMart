import { useSelector } from "react-redux";
import Login from "../components/Login/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
