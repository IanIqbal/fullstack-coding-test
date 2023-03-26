import { getOrganizations } from "../store/action"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Organizations from "../components/Organizations"

export default function Home() {

    const organizations = useSelector((state) => state.organizations)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getOrganizations())
    }, [])

    return (
       <Organizations organizations={organizations} ></Organizations>
    )
}