import { Link } from "react-router-dom";
import { AddIcon } from "../components/Icons/Icons";
import axios from "axios";
import Cookies from "js-cookie";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import { EditIcon } from "../components/Icons/Icons";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.get('http://localhost:1233/places', { withCredentials: true })
                .then(({ data }) => {
                    setPlaces(data);
                });
        }
    }, []);

    return (
        <section>
            <AccountNav />
            <div>
                <div className="text-center">
                    List of all added places
                    <br />
                    <Link className='inline-flex bg-primary text-white py-2 px-4 rounded-full gap-2' to={'/account/places/new'}>
                        <AddIcon />
                        Add new place
                    </Link>
                </div>
                <section className="mt-4">
                    {places.length > 0 && places.map((place) => (
                        <div key={place._id} className="bg-gray-100 p-4 rounded-2xl flex gap-4 my-3">
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                {place.photos.length > 0 && (
                                    <img className="w-full" src={'http://localhost:1233/uploads/' + place.photos[0]} alt={place.title} />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p><small>{place.description}</small></p>
                                <Link to={'/account/places/' + place._id} className="relative -right-[580px] hover:text-primary">
                                    <EditIcon />
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

        </section >
    );
}
