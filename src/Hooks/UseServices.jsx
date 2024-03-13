import { useEffect, useState } from "react";

export default function UseServices() {
    const [Services, setservices] = useState([])
    useEffect(() => {
        fetch('https://car-doctor-server-chi-eight.vercel.app/services')
            .then(res => res.json())
            .then(data => {
                setservices(data)
            })
    }, [])
    return Services;
}