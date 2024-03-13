import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function PrivateRoute({ children }) {
    const { users, loading } = useContext(AuthContext)
    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (users) {
        return children
    }
    return (
        <div>

        </div>
    )
}