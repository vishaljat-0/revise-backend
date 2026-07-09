import { createBrowserRouter } from "react-router"
import Home from './home/pages/Home'



export  const router= createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
])