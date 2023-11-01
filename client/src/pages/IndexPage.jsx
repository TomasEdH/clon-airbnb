import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function IndexPage() {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('http://localhost:1233/places').then((response) => {
            setPlaces(response.data);
        });
    }, []);


    return (
        <div>
            <section className="mt-9 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {places.length > 0 && places.map(place => (
                    <Link key={place._id} to={'/place/' + place._id}>
                        <div className="rounded-2xl mb-2 flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:1233/uploads' + place.photos[0]} alt="" />
                            )}
                        </div>
                        <h2 className="text-sm font-bold">{place.address}</h2>
                        <h3 className="opacity-70">{place.title}</h3>
                        <div className="mt-2">
                            <strong className="text-sm">${place.price} por noche</strong>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

