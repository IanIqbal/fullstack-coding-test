import { useEffect, useState } from "react"
import axios from "axios"
import Tree from "react-d3-tree"
import {useNavigate} from "react-router-dom"
import nodeFormatter from "../helpers/nodeFormatter"

export default function OrganizationForm() {
    const navigate = useNavigate()
    const [input, setInput] = useState({ name: "" })
    const [inputNodes, setInputNodes] = useState([{}])
    const display = nodeFormatter(inputNodes)
    
    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const addNodes = (e) => {
        e.preventDefault()
        setInputNodes([...inputNodes, {}])
    }

    const inputNodesHandler = (e, indexInput) => {

        // console.log(e.target.name, "<<<<target name");
        // console.log(e.target.value, "<<<<target value");

        const data = inputNodes.map((el, index) => {
            if (indexInput == index) {
                return { ...el, name: e.target.value }
            }

            return el
        })

        setInputNodes(data)
    }

    const inputNodesHandlerParent = (e, indexInput) => {



        const data = inputNodes.map((el, index) => {
            if (indexInput == index) {
                return { ...el, parent: e.target.value }
            }

            return el
        })

        setInputNodes(data)
    }

    const submitForm = async () => {
        try {

            let nodes = inputNodes.map(el => {
                return { label: el.name, parent: el.parent }
            })
            let newData = { name: input.name, nodes }
            console.log(newData);
            const { data } = await axios({
                url: "http://localhost:3000/organizationNode",
                method: "post",
                data: newData,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }

            })

            navigate("/myorganizations")
            console.log(data);
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }
    // console.log(input);
    console.log(display);
 
    // useEffect(()=>{

    // },[inputNodes])
    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 > Create Organization</h1>
            </div>
            <div id="treeWrapper" style={{ width: '15%', height: '90%', border: "2px", borderStyle: "solid", display:"flex", justifyContent:"center", marginLeft:"820px", marginBottom:"50px" }} >

                <Tree data={ display } rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf" >

                    </Tree>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "800px", borderRadius: "5px", borderStyle: "solid" }}>
                    <div style={{ width: "10", padding: "20px" }}>

                        <form onSubmit={(e) => { e.preventDefault(); submitForm() }} >
                            <label style={{ backgroundColor: "#e7e7e7", borderRadius: "5px", padding: "5px" }}>Name</label>
                            <input style={{ width: "100%", marginBottom: "15px" }} type="text" name="name" value={input.name} onChange={inputHandler} />



                            {inputNodes.map((el, index) => {
                                return (
                                    <div>
                                        <label >Label Node</label>
                                        <input type="number" name={index} value={inputNodes[index].name} onChange={(e) => inputNodesHandler(e, index)} />

                                        <label >Parent Node</label>
                                        { index && <input type="number" name={index} value={inputNodes[index].parent} onChange={(e) => inputNodesHandlerParent(e, index)} />}
                                    </div>
                                )
                            })}
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                <button onClick={(e) => addNodes(e)} >Add Node</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                <button type="submit" >Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}