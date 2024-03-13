
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

export default function Login() {

    const { signin } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()

    const hendelLogin = even => {
        even.preventDefault()
        const form = even.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signin(email, password)
            .then(result => {
                const loggedinuser = result.user;
                console.log(loggedinuser)
                const user = { email }


                navigate(location?.state ? location?.state : '/' )

                //access token

                // axios.post('https://car-doctor-server-chi-eight.vercel.app/jwt', user, {
                //     withCredentials: true
                // })
                //     .then(res => {
                //         console.log(res.data, "adasdasdasd Test")
                //         if (res.data.success) {
                //             navigate(location?.state ? location?.state : '/')
                //         }
                //     })

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={hendelLogin} className="card-body">
                        <h1 className="text-3xl text-center  font-bold">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>New to cars doctors <Link to={'/signup'} className='text-orange-500 font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}