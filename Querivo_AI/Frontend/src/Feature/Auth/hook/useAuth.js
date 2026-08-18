import { useDispatch } from "react-redux";
import { login, register, getMe } from "../service/auth.Api.js";
import { setUser, setError, setLoading } from "../auth.slice.js";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleregister = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      const response = await register({ username, email, password });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlelogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const response = await login({ email, password });

      console.log("USER", response.user);
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

 const handlegetme = async () => {
  try {
    console.log("GETME START");

    dispatch(setLoading(true));

    const response = await getMe();

    console.log("GETME RESPONSE", response.user);

    dispatch(setUser(response.user));
  } catch (error) {
    console.log("GETME ERROR", error);
  } finally {
    dispatch(setLoading(false));
  }
};

  return { handleregister, handlelogin, handlegetme };
};
