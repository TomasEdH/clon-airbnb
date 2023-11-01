import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function RegisterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {

        event.preventDefault()
        await axios.post('http://localhost:1233/register', {
            name,
            email,
            password
        })
        alert('Succesful register')
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-64">
                <h2 className="text-4xl text-center mb-4">Register</h2>
                <form className="max-w-xl mx-auto" onSubmit={registerUser}>
                    <input className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl " type="text" placeholder="Your Name" value={name} onChange={(e => setName(e.target.value))} />
                    <input className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl" type="email" placeholder="your@email.com" value={email} onChange={(e => setEmail(e.target.value))} />
                    <input className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl" type="password" placeholder="password" value={password} onChange={(e => setPassword(e.target.value))} />
                    <button className="bg-primary mb-2 w-full p-2 text-white rounded-2xl">Register</button>
                    <div className="text-center py-2 text-gray-600">
                        Already a member?
                        <Link className="underline text-black px-1" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}