import { login,register,getme,logout } from "../services/auth.api"
import { useContext } from "react"
import { Authcontext } from "../auth.context"
import { useEffect } from "react"


 export const useAuth=()=>{
    const context=useContext(Authcontext)
    const {user,setuser,loading,setloading}=context
    const handleregiter=async({username,email,password})=>{
         console.log(username,email,password);
        setloading(true)
        const response = await register({username,email,password})
        console.log(response);
        setuser(response.user.username)
        setloading(false)

    }
    const handlelogin=async({username,email,password})=>{
        setloading(true)
        const response = await login({username,email,password})
        setuser(response.user.username)
        setloading(false)
    }
    const handlelogout=async()=>{
        setloading(true)
        const response = await logout()
        setuser(null)
        setloading(false)
    }
    const handlegetme=async()=>{
        setloading(true)
        const response = await getme()
        setuser(response.user.username)
        setloading(false)
    }

    useEffect(()=>{
        handlegetme()
    },[])
    return {user,loading,handleregiter,handlelogin,handlelogout,handlegetme}
 }