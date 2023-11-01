/* eslint-disable react/prop-types */
import { MyProfileIcon, MyBookingIcon, MyAccommodationsIcon } from "../components/Icons/Icons"
import { Link, useLocation } from "react-router-dom"


export default function AccountNav() {

    //Obtenemos la ubicación/url exacta de nuesta locacion actual
    //lo hacemos para tomar solo el subpage de la url general '/account
    const { pathname } = useLocation()
    let subpage = pathname.split('/')?.[2]
    //divide el string en base al separador '/'
    //y lo convierte en array. tomamos de ese array lo que esta en la segunda posición
    if (subpage === undefined) {
        subpage = 'profile'
    }

    function linkClasses(type = null) {
        // hacemos este condicional para que cada boton obtenga los estilos deseados
        let classes = 'inline-flex gap-2  py-2 px-6'
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full'
        } else {
            classes += ' bg-gray-200 rounded-full'
        }
        return classes
    }

    return (

        <nav className="w-full flex justify-center my-8 gap-3 ">

            <Link className={linkClasses('profile')} to={'/account'}>
                <MyProfileIcon />
                My profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <MyBookingIcon />
                My booking
            </Link>

            <Link className={linkClasses('places')} to={'/account/places'}>
                <MyAccommodationsIcon />
                My accommodations
            </Link>

        </nav>
    )
}