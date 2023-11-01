/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import BookingWidget from "../components/BookingWidget";
import { CloseIcon, AddressIcon, ShowMoreIcon } from "../components/Icons/Icons";


export default function SinglePlacePage() {

    const { id } = useParams()
    const [place, setPlace] = useState()
    const [showPhotos, setShowPhotos] = useState(false)

    useEffect(() => {
        if (!id) return
        axios.get(`http://localhost:1233/places/${id}`)
            .then(response => {
                setPlace(response.data)
            })
    }, [id])


    if (!place) return ''
    if (showPhotos) {
        return (
            <section className="absolute inset-0 bg-black min-h-screen">
                <div className="p-8 grid gap-4 bg-black">
                    <div>
                        <h2 className="text-3xl font-semibold mr-44 text-white">Photos of {place.title}</h2>
                        <button onClick={() => setShowPhotos(false)} className="fixed right-12 top-15 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black shadow shadow-black font-medium">
                            <CloseIcon/>
                            Close photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img className="w-full" src={'http://localhost:1233/uploads/' + photo} alt={place.title} />
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (

        <section className="my-8 bg-gray-100 -mx-8 px-8 pt-4">
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <a className="flex gap-1 my-2 font-bold underline" target='_blank' href={'https://maps.google.com/?q=' + place.adress} rel="noreferrer">
                <AddressIcon/>
                {place.address}</a>
            <article className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            //imagen principal
                            <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1233/uploads/' + place.photos[0]} alt="" 
                            onClick={()=> setShowPhotos(true)}/>
                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cove cursor-pointer" src={'http://localhost:1233/uploads/' + place.photos[1]} alt="" 
                            onClick={()=> setShowPhotos(true)}/>
                        )}
                        {place.photos?.[2] && (
                            <img className="aspect-square object-cover cursor-pointer" src={'http://localhost:1233/uploads/' + place.photos[2]} alt="" 
                            onClick={()=> setShowPhotos(true)}/>
                        )}
                    </div>
                </div>
                <div>

                </div>
                <button className="bg-white rounded-2xl border-black shadow-md shadow-gray-600 absolute bottom-2 right-2 py-2 px-4 flex gap-2 font-medium" onClick={() => setShowPhotos(true)}>
                    <ShowMoreIcon/>
                    Show more photos
                </button>
            </article>
            <article className="mt-6 mb-7 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl mb-3">Description</h2>
                        {place.description}
                    </div>
                    <strong>Check-in: {place.checkIn}</strong>  <br />
                    <strong>Check-out: {place.checkOut}</strong> <br />
                    <strong>Max number of guests: {place.maxGuests}</strong>
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </article>
            <article className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h3 className="font-semibold text-2xl">Extra Info</h3>
                </div>
                <div className="-mb-5 mt-1 tetx-sm text-gray-700 leading-7">
                    {place.extraInfo}
                    <p></p>
                </div>
            </article>
        </section>

    )
}