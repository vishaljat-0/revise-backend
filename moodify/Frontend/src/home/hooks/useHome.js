import { getme } from "../services/home.api.js";
import { useContext } from "react";
import { Homecontext } from "../home.context";

export const useHome = () => {
  const { loading, setloading, song, setsong } =
    useContext(Homecontext);

  const handlegetme = async ({ mood }) => {
    setloading(true);

    try {
      const response = await getme({ mood });

   

      setsong(response.randomSong);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return {
    handlegetme,
    loading,
    song,
  };
};