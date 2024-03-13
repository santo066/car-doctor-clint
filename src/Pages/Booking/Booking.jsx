import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import BookingRow from "./BookingRow"
import Swal from "sweetalert2"
import axios from "axios"
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"


export default function Booking() {
    const { users } = useContext(AuthContext)
    const [bookings, setBooking] = useState([])
    const AxiosSecure = UseAxiosSecure();
    // const url = `https://car-doctor-server-chi-eight.vercel.app/booking?email=${users?.email}`
    const url = `/booking?email=${users?.email}`

    useEffect(() => {

        // fetch(url,{credentials: "include"})
        //     .then(res => res.json())
        //     .then(data => {
        //         setBooking(data)
        //         console.log(data)
        //     })

        AxiosSecure.get(url)
            .then(res => setBooking(res.data))

    }, [url,AxiosSecure])

    const hendeldelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://car-doctor-server-chi-eight.vercel.app/booking/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            const remaining = bookings.filter(booking => booking._id !== id)
                            setBooking(remaining)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
            }
        });
    }


    const hendelbookingconfirm = id => {
        fetch(`https://car-doctor-server-chi-eight.vercel.app/booking/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const update = bookings.find(booking => booking._id === id);
                    update.status = 'confirm';
                    const newbookings = [update, ...remaining]
                    setBooking(newbookings)
                }
            })
    }

    return (
        <div>
            <h2>booking:{bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                hendeldelete={hendeldelete}
                                booking={booking}
                                hendelbookingconfirm={hendelbookingconfirm}
                            ></BookingRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    )
}