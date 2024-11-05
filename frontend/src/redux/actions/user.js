import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Erro ao carregar usuário",
    });
  }
};

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};


export const UpdateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateUserInfoRequest" });

    const { data } = await axios.put(`${server}/user/update-user-info`, ({
      name,
      email,
      phoneNumber,
      password,
    }), {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });

  } catch (error) {
    dispatch({
      type: "LoadUserFailed",
      payload: error.response.data.message,
    });
  }
};
