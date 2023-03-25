import { NavLink } from "react-router-dom";

export default function Navbar(){

    return (
        <div style={{display:"flex", justifyContent:"center"}} >
            <NavLink to="/" >Home</NavLink>

            <div style={{marginLeft:"800px"}} >  
            <NavLink>My Work</NavLink>
            <NavLink to="/Login" >Login</NavLink>
            <NavLink onClick={()=>  { localStorage.clear() } }  >Logout</NavLink>

            </div>
        </div>
    )
}