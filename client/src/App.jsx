import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import SinglePlacePage from './pages/SinglePlacePage'
import BookingsPage from './pages/BookingsPage'
import SingleBookingPage from './pages/SingleBookingPage'


function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/account/' element={<ProfilePage />}></Route>
            <Route path='/account/places' element={<PlacesPage />}></Route>
            <Route path='/account/places/new' element={<PlacesFormPage />}></Route>
            <Route path='/account/places/:id' element={<PlacesFormPage />}></Route>
            <Route path='/place/:id' element={<SinglePlacePage />}></Route>
            <Route path='/account/bookings' element={<BookingsPage />}></Route>
            <Route path='/account/bookings/:id' element={<SingleBookingPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
