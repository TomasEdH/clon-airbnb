import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../UserContext"

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)

    async function handleLogin(e){
        try {
            //usamos withCredentials para indicar si se deben utilizar cookies en la request, esto ademas las setea en las cookies del storage del navegador
            e.preventDefault()
            const {data} = await axios.post('http://localhost:1233/login', { email, password }, { withCredentials: true })
            setUser(data)
            alert('Succesful login')
            setRedirect(true)

        } catch (error) {
            alert('Something went bad', error)
        }
    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    return (

        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h2 className="text-4xl text-center mb-4">Login</h2>
                <form className="max-w-xl mx-auto" onSubmit={handleLogin}>
                    <input className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="bg-primary mb-2 w-full p-2 text-white rounded-2xl">Login</button>
                    <div className="text-center py-2 text-gray-600">
                        Dont have an account yet? 
                        <Link className="underline text-black px-1" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}