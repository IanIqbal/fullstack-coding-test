import axios from "axios"
import { GET_MY_ORGANIZATIONS, GET_ORGANIZATIONS } from "./actionType"
const baseUrl = "http://localhost:3000"

const getOrganizationsDone = (payload) => {

    return {
        payload,
        type:GET_ORGANIZATIONS
    }
}

const getMyOrganizationsDone = (payload) => {

    return {
        payload,
        type: GET_MY_ORGANIZATIONS
    }
}

export const getOrganizations = ()=>{
    return async (dispatch) =>{
        try {
            const {data} = await axios({
                url: baseUrl + "/organizationNode",
                method:"get",
                headers:{
                    access_token:localStorage.getItem("access_token")
                }
            })

            dispatch(getOrganizationsDone(data))
        } catch (error) {
            console.log(error.response.data);
        }
    }
}

export const getMyOrganizations = () =>{
    return async (dispatch)=>{
        try {
            
            const {data} = await axios({
                url:baseUrl + "/organizationNode/myOrganizations",
                method:"get",
                headers:{
                    access_token:localStorage.getItem("access_token")
                }
            })

            dispatch(getMyOrganizationsDone(data))
        } catch (error) {
            console.log(error.response.data);
        }
    }
}