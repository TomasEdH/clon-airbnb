import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { TOKEN_REMOVE } from "../utils/utils"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"


export default function ProfilePage() {

    const [redirect, setRedirect] = useState(false)
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams()
    //en el caso de la subpage 'profile' al tener una subpage con valor undefined, la forma para que pueda obtener los estilos es sobreescribiendole un string con el valor 'profile'
    if (subpage === undefined) {
        subpage = 'profile'
    }


    async function logOut() {
        try {
            await axios.post('http://localhost:1233/logout');
            // Elimina la cookie del token en el lado del cliente
            document.cookie = TOKEN_REMOVE
            setRedirect('/')
            setUser(null)
        } catch (error) {
            console.error("Error al realizar el logout", error);
        }
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }


    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }


    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} with email: {user.email} <br />
                    <button className="bg-primary text-white px-[100px] py-2 rounded-full mt-4 max-w-" onClick={logOut}>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}