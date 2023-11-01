import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({})



// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {

    if (!user) {
      //usar la url del host del puerto que usa la api
      axios.get('http://localhost:1233/profile', { withCredentials: true }).then(({ data }) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  )
}