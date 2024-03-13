import { useEffect, useState } from "react"
import ServicesCard from "./ServicesCard"
import UseServices from "../../Hooks/UseServices"

export default function Services() {
    // const [Services, setservices] = useState([])
    // useEffect(() => {
    //     fetch('https://car-doctor-server-chi-eight.vercel.app/services')
    //         .then(res => res.json())
    //         .then(data => {
    //             setservices(data)
    //         })
    // }, [])
    const Services = UseServices();
    return (
        <div>
            <div className="text-center">
                <h3 className="text-3xl text-orange-500 font-bold">Services</h3>
                <h5 className="text-5xl font-bold">Our Service Area</h5>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {
                    Services.map(service => <ServicesCard
                        key={service._id}
                        service={service}
                    ></ServicesCard>)
                }
            </div>
        </div>
    )
}