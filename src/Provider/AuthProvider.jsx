import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
    const [users, setUsers] = useState(null)
    const [loading, setloading] = useState(null)


    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signin = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        setloading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentuser => {
            const userEmail = currentuser?.email || users?.email;
            const loggedUser = { email: userEmail }
            setUsers(currentuser)
            console.log('user ase nki', currentuser)
            setloading(false)
            // jwt
            if (currentuser) {
                axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token responsed', res.data)
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                    })
            }
        })
        return () => {
            return unsubcribe();
        }
    }, [])

    const AuthInfo = {
        users,
        loading,
        createUser,
        signin,
        logout

    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    )
}