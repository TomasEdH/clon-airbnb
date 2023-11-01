/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import Cookies from 'js-cookie'
import { UploaderPhotos } from "../components/UploaderPhotos"
import { Perks } from "../components/Perks"
import AccountNav from "../components/AccountNav"

export default function PlacesFormPage() {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(1)
    const [redirect, setRedirect] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])


    useEffect(() => {
        if (!id) return;
        axios.get('http://localhost:1233/places/' + id)
            .then(response => {
                const { data } = response
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            })
    }, [id])

    async function addNewPlace(event) {
        event.preventDefault();
        const token = Cookies.get('token'); // Obtén el token JWT almacenado en tu //aplicación (si lo estás utilizando)
        if (id) {
            if (token) {
                const data = await axios.put('http://localhost:1233/places', {
                    id,
                    title,
                    address,
                    addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                }, {
                    withCredentials: true
                });

                //update
            }
            setRedirect(true)
        } else {

            if (token) {
                const data = await axios.post('http://localhost:1233/places', {
                    title,
                    address,
                    addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                }, {
                    withCredentials: true
                });

            }    //create new place
            setRedirect(true)
        }

    }


    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={addNewPlace}>
                    <h2 className="text-2xl mt-4">Title</h2>
                    <p><small className="text-gray-500">Title for your place</small></p>
                    <input type="text" placeholder="title, for example: My amazing apartment"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl"
                    />
                    <h2 className="text-2xl mt-4">Address</h2>
                    <p>
                        <small className="text-gray-500">
                            Address to this place  
                        </small>
                    </p>
                    <input type="text" placeholder="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl"
                    />
                    <h2 className="text-2xl mt-4">Photos</h2>
                    <p>
                        <small className="text-gray-500">
                            Here you can show your place
                        </small>
                    </p>
                    <UploaderPhotos addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2 className="text-2xl mt-4">Description</h2>
                    <p>
                        <small className="text-gray-500 ">Description of the place
                        </small>
                    </p>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Perks selected={perks} onChange={setPerks} />
                    <h2 className="text-2xl mt-4 ">Extra information</h2>
                    <p>
                        <small className="text-gray-500">
                            Bring more information about your place
                        </small>
                    </p>
                    <textarea
                        value={extraInfo}
                        onChange={e => setExtraInfo(e.target.value)}
                    />
                    <h2 className="text-2xl mt-4">Check in & out</h2>
                    <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input type="number"
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)} placeholder="12" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input type="number"
                                value={checkOut}
                                onChange={e => setCheckOut(e.target.value)} placeholder="12" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input type="number"
                                value={maxGuests}
                                onChange={e => setMaxGuests(e.target.value)} />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)} />
                        </div>
                    </section>
                    <button className="bg-primary mt-2 w-full p-2 text-white rounded-2xl">Save</button>
                </form>

            </div>
        </>
    )
}