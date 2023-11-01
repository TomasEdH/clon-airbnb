/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import {  UploadIcon } from "../components/Icons/Icons.jsx"
import { HeartIcon, SolidHeartIcon, TrashIcon } from "./Icons/UploaderPhotos/Icons"

export function UploaderPhotos({addedPhotos, onChange}) {

    const [photolink, setPhotoLink] = useState('')

    async function addPhotoByLink(event) {
        event.preventDefault()
        const { data: fileName } = await axios.post('http://localhost:1233/upload-by-link', { link: photolink })

        onChange(prev => {
            return [...prev, fileName]
        })

        setPhotoLink('')
    }

    function uploadPhoto(event) {
        const files = event.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos ', files[i])
        }
        axios.post('http://localhost:1233/upload', data, {
            headers: { 'Content-Type':'multipart/form-data' }
        }).then(response => {
            const { data: fileNames } = response
            onChange(prev => {
                return [...prev, ...fileNames]
            })
        })
    } 

    function removePhoto(fileName, event){
        event.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !==fileName)])
    }
    
    function selectMainPhoto (fileName, event) {
        event.preventDefault()
        const nonSelectedAddedPhotos = addedPhotos.filter(photo => photo !== fileName)
        const newAddedPhotos = [fileName,...nonSelectedAddedPhotos]
        onChange(newAddedPhotos)
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text" placeholder={'Add using a link....jpg'}
                    value={photolink}
                    onChange={e => setPhotoLink(e.target.value)} className="w-full mb-2 border my-1 py-2 px-3 rounded-2xl" />
                <button
                    onClick={addPhotoByLink}
                    className="bg-gray-200 px-4 rounded-2xl ">Add&nbsp;photo</button>
            </div>
            <div className=" mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className='w-full rounded-2xl' src={'http://localhost:1233/uploads/' + link} alt="" />
                        <button onClick={event=>removePhoto(link, event)} className=" cursor-pointer absolute bottom-2 right-2 text-white p-1 bg-black bg-opacity-60 rounded-xl">
                            <TrashIcon/>
                        </button>
                        
                        <button onClick={event => selectMainPhoto(link, event)} className=" cursor-pointer absolute bottom-1 left-1 text-white p-1 bg-black bg-opacity-60 rounded-xl">
                            {link === addedPhotos[0] && (
                                <HeartIcon/>
                            )}
                            {link !== addedPhotos[0] && (
                                <SolidHeartIcon/>
                            )}
                        </button>
                    </div>
                )
                )}
                <label className=" flex justify-center items-center gap-4 border bg-transparent rounded-2xl p-6 text-gray-900 font-semibold cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <UploadIcon />
                    Upload your photos
                </label>
            </div>
        </>
    )
}