import { useContext } from "react";
import { AuthContext } from "../store/auth.context";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, loading, setuser, setloading } = context;
  const loginHandler = async (username, password) => {
    try {
      setloading(true);
      const response = await login(username, password);
      setuser(response.user);
      setloading(false);
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };
  const registerHandler = async (username, email, password) => {
    try {
      setloading(true);
      const response = await register(username, email, password);
      setuser(response.user);
      setloading(false);
    } catch (error) {
      throw error;
    } finally {
      setloading(false);
    }
  };
  return { user, loading, loginHandler, registerHandler };
};
