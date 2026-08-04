import { createBrowserRouter } from "react-router"
import Home from './home/pages/Home'
import Login from "./Auth/pages/Login"
import Register from "./Auth/pages/Register"
import Protected from "./Auth/components/Protected"



export  const router= createBrowserRouter([
    {
        path: "/",
        element: <Protected>
            <Home />
        </Protected>
    },{
        path: "/login",
        element: <Login/>
    }
    ,{
        path:"/register",
        element:<Register/>
    }
])