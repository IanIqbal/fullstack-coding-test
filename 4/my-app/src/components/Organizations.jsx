import Tree from 'react-d3-tree';
import { useLocation, useNavigate} from "react-router-dom"

import "./tree.css"
export default function Organizations({ organizations }) {
    let { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <div style={{ textAlign: "center", marginTop: "70px" }} >

            {pathname == "/" ?

                <h1>Home</h1> :

                <div>

                    <h1> {localStorage.getItem("name")}'s Organizations' </h1>
                    <button style={{ borderRadius: "5px" }} onClick={ ()=> navigate("/createorganization") } >Create Organization</button>
                </div>
            }

            <div style={{ display: "flex", justifyContent: "center" }} >

                {
                    organizations.organizations ? organizations.organizations.map(el => {
                        return (
                            <div style={{ textAlign: "center", margin: "0 20px" }} >

                                <h1>{el.name}</h1>
                                {el.User && <h3>Created By: {el.User.name}</h3>}
                                <div id="treeWrapper" style={{ width: '100%', height: '100%', border: "2px", borderStyle: "solid" }} >

                                    <Tree data={el.tidyNodes} rootNodeClassName="node__root"
                                        branchNodeClassName="node__branch"
                                        leafNodeClassName="node__leaf" ></Tree>
                                </div>
                            </div>
                        )
                    })
                        : null
                }

            </div>
        </div>
    )
}