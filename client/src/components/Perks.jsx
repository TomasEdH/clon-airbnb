/* eslint-disable react/prop-types */
import { WiFiIcon, PetsIcon, TVIcon, PrivateIcon, ParkingIcon } from "../components/Icons/Perks/Icons"

// eslint-disable-next-line react/prop-types
export const Perks = ({selected, onChange}) => {

    function handleCheckBox(event){
        //nos fijamos si el checkbox esta selccionado y en base a eso modifica el
        //estado del evento
       // console.log(event.target.checked, event.target.name)
        const {name, checked} = event.target;
        if(checked){
            onChange([...selected, name])
        }else {
            // eslint-disable-next-line react/prop-types
            onChange([...selected.filter(selectedName => selectedName !== name )])
        }
    }
    return (
        <section>
            <h2 className="text-2xl mt-4">Perks</h2>
            <p>
                <small className="text-gray-500 ">Select all the perks of your place
                </small>
            </p>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckBox} />
                    <span>Wi-Fi</span>
                    <WiFiIcon />
                </label >
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheckBox}/>
                    <span>Free parking spot</span>
                    <ParkingIcon />
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCheckBox}/>
                    <span>TV</span>
                    <TVIcon />
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCheckBox}/>
                    <span>Pets</span>
                    <PetsIcon />
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes('private_entrance')} name="private_entrance" onChange={handleCheckBox} />
                    <span>Private Entrance</span>
                    <PrivateIcon />
                </label>
            </section>
        </section>

    )
} 