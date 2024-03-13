import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"

export default function Private({ children }) {
    const { users, loading } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (users) {
        return children
    }

    return <Navigate state={location?.pathname} to={'/login'}></Navigate>
}