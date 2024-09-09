import { useNavigate } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
