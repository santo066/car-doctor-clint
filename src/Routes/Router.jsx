import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Chackout from "../Pages/Chackout/Chackout";
import Booking from "../Pages/Booking/Booking";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Private from "../PrivateRoute/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/chackout/:id',
        element: <Private><Chackout></Chackout></Private>,
        loader: ({ params }) => fetch(`https://car-doctor-server-chi-eight.vercel.app/services/${params.id}`)
      },
      {
        path: '/booking',
        element: <PrivateRoute><Booking></Booking></PrivateRoute>
      },
    ]
  },
]);

export default router;