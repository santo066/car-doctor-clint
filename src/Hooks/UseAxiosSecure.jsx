import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AxiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export default function UseAxiosSecure() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        AxiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error trapt in the interseptor', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('logout in the user')
                logout()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
    }, [])

    return AxiosSecure;
}