import { useDispatch } from "react-redux";

import { login, register } from "../service/auth.api.js";
import { setError, setLoading, setUser } from "../state/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const registerHandler = async ({
    fullName,
    email,
    contact,
    password,
    isSeller = false,
  }) => {
    dispatch(setLoading(true));

    try {
      const data = await register({
        fullName,
        email,
        contact,
        password,
        isSeller,
      });

      dispatch(setUser(data.user));

      return data.user;
    } catch (error) {
      console.log("Register error:", error.response?.data);

      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  const loginHandler = async ({ email, password }) => {
    try {
       dispatch(setLoading(true));
       const data=await login({ email, password });

       dispatch(setUser(data.user));

    } catch (error) {
      console.log("Login error:", error.response?.data);

      dispatch(
        setError(error.response?.data?.message || "Login failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { registerHandler, loginHandler };
};
