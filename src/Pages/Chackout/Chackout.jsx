import { useContext } from "react"
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../../Provider/AuthProvider"
import Swal from "sweetalert2"

export default function Chackout() {
    const { users } = useContext(AuthContext)
    const services = useLoaderData()
    const { title, _id, price, img } = services
    const hendelBookServices = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = users?.email;
        const order = {
            CustomerName: name,
            email,
            date,
            img,
            services: title,
            services_id: _id,
            price
        }

        console.log(order)

        fetch('https://car-doctor-server-chi-eight.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(req => req.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your order has been successfull.",
                        icon: "success"
                    });
                }

            })
    }
    return (
        <div>
            <h2 className="text-center text-3xl">book Services: {title}</h2>

            <form onSubmit={hendelBookServices} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={users?.displayname} placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" placeholder="Date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={users?.email} placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deu Amount</span>
                        </label>
                        <input type="text" name="price" defaultValue={'$' + price} className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">
                    <input type="submit" className="btn btn-primary" value="Order Confirm" />
                </div>
            </form>
        </div>

    )
}