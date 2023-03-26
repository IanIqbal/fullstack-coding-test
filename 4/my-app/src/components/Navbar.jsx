import { NavLink } from "react-router-dom";

export default function Navbar(){

    return (
        <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}} >
            <NavLink style={{textDecoration:"none", color:"black", margin:"0px 5px"}} to="/" >Home</NavLink>

            <div style={{marginLeft:"800px"}} >  
            <NavLink style={{textDecoration:"none", color:"black", margin:"0px 5px"}} to="/myorganizations" >My Work</NavLink>

            { !localStorage.getItem("access_token") && <NavLink style={{textDecoration:"none", color:"black", margin:"0px 5px"}} to="/Login" >Login</NavLink>}

            { localStorage.getItem("access_token") && <NavLink style={{textDecoration:"none", color:"black", margin:"0px 5px"}} onClick={()=>  { localStorage.clear() } }  >Logout</NavLink>}

            </div>
        </div>
    )
}