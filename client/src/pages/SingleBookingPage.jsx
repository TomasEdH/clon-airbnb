import { useParams } from "react-router-dom"

export default function SingleBookingPage(){

    const {id} = useParams()

    return(
            <div>Soy single booking page for: {id}</div>
    )
}