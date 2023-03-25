import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"

export default function Frontpage() {

    return (
        <>
            <Outlet></Outlet>

            <div style={{marginTop:"20px"}} >

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >

                    <NavLink to="/register" >Register</NavLink>
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >

                    <NavLink to="/login" >Login</NavLink>
                </div>

            </div>
        </>
    )
}