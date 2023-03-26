import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Tree from 'react-d3-tree';
import { getMyOrganizations } from "../store/action";
import Organizations from "../components/Organizations";

export default function MyOrganizations() {

    const dispatch = useDispatch()
    const myOrganizations = useSelector((state) => state.myOrganizations)

    useEffect(() => {
        dispatch(getMyOrganizations())
    }, [])
    return (
       <Organizations organizations={myOrganizations} ></Organizations>
    )
}