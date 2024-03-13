import { useEffect, useState } from "react";

export default function UseServices() {
    const [Services, setservices] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setservices(data)
            })
    }, [])
    return Services;
}