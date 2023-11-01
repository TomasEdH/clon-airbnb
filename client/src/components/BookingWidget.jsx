import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [redirect, setRedirect] = useState('')

    let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {

        const response = await axios.post('http://localhost:1233/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phoneNumber,
            place: place._id,
            price: numberOfNights * place.price
        })

        const bookingId = response.data._id
        if (bookingId) {
            setRedirect(`/account/bookings/${bookingId}`)
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow rounded-2xl p-4">
            <div className="text-2xl text-center">
                <h2>
                    Price: ${place.price} /per night
                </h2>
            </div>
            <div className="border- rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check-in:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check-out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests</label>
                    <input type="number"
                        value={numberOfGuests}
                        onChange={e => setNumberOfGuests(e.target.value)} />
                </div>
                {numberOfNights > 0 && (

                    <div className="py-3 px-4 border-t">
                        <label>Full name:</label>
                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label>Phone number:</label>
                        <input type="tel"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)} />
                    </div>
                )}
            </div>
            <button className="primary" onClick={bookThisPlace}>
                Book this place
                {numberOfNights > 0 && (
                    // nos muestar el precio por noche
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}