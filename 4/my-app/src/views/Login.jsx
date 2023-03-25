import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Login() {

    const navigate = useNavigate()
    const [input, setInput] = useState({username:"", password:""})
    const inputHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value})
    }

    const submitForm = async() => {
        try {
            const {data} = await axios({
                url:"http://localhost:3000/login",
                method:"post",
                data:{
                    username:input.username,
                    password:input.password
                }
            })

            localStorage.setItem("access_token", data.access_token)

            navigate("/")
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 > Login</h1>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{  width: "800px", borderRadius: "5px", borderStyle:"solid" }}>
                    <div style={{ width: "10", padding: "20px" }}>

                        <form onSubmit={(e) => {e.preventDefault(); submitForm() }} >
                           

                            <label style={{ backgroundColor: "#e7e7e7", borderRadius: "5px", padding: "5px" }}>Username</label>
                            <input style={{ width: "100%", marginBottom: "15px" }} type="text" name="username" value={input.username} onChange={inputHandler} />
                            <label style={{ backgroundColor: "#e7e7e7", borderRadius: "5px", padding: "5px" }}  > Password</label>
                            <input style={{ width: "100%" }} type="text" name="password"  value={input.password} onChange={inputHandler} />

                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                <button style={{borderRadius:"5px"}} type="submit" >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}