import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

export default function Navbar() {
    const hendellogout = () => {
        logout()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }
    const { users, logout } = useContext(AuthContext)
    const navitem = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/signup'}>Signup</Link></li>
        {
            users?.email ? <>
                <li><Link to={'/booking'}>Bookings</Link></li>
                <button onClick={hendellogout} className="btn btn-outline btn-warning">Log Out</button>
            </>
                :
                <Link to={'/login'}><button className="btn btn-outline btn-warning">Login</button></Link>
        }
    </>



    return (
        <div className="navbar  mb-4 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navitem}
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">
                    <img src={logo} className="w-16" alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navitem}
                </ul>
            </div>
            <div className="navbar-end">

                <button className="btn btn-outline btn-warning">Acheivement</button>


            </div>
        </div>
    )
}