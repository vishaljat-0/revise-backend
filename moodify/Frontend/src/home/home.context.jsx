import { createContext } from "react";
import { useState } from "react";



 export  const Homecontext= createContext();
  export const Homeprovider=({children})=>{

const [loading, setloading] = useState(false)
const [song, setsong] = useState(null)

   
 return(
    <Homecontext.Provider value={{loading,setloading,song,setsong}}>
        {children}
    </Homecontext.Provider>
 )


 }