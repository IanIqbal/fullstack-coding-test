import {createBrowserRouter, redirect} from "react-router-dom"
import Basiclayout from "../views/Basiclayout"
import Register from "../views/Register"
import Login from "../views/Login"
import Frontpage from "../views/Frontpage"
import Home from "../views/Home"

const router = createBrowserRouter([
    {
        element:<Basiclayout></Basiclayout>,
        children:[
            {
                element:<Home></Home>,
                loader:()=>{
                    if(!localStorage.getItem("access_token")){
                        return redirect("/login")
                    }

                    return null
                },
                path:"/"
            },
            {
                element:<Frontpage></Frontpage>,
                loader:()=>{
                    if(localStorage.getItem("access_token")){
                        return redirect("/")
                    }

                    return null
                },
                children:[
                    {
                        element:<Register></Register>,
                        path:"/register"
                    },
                    {
                        element:<Login></Login>,
                        path:"/login"
                    }
                ]
            }
        ]
    }
])

export default router