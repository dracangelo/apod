import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from './Navbar';

const API_KEY = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto(){
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto(){
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);

            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    if(!photoData) return <div/>

    return (
        <>
        <Navbar/>
        <div>
            {photoData.media_type === "image" ? (
            <img src={ photoData.url } alt={ photoData.title } /> 
            ): (
                <iframe
                title= "space video"
                src={ photoData.url }
                frameBorder="0"
                gesture="media"
                allow="encrypted-media"
                allowFullScreen
                className='photo'
                />
            )}
            <div>
                <h2>{ photoData.title }</h2>
                <p>{ photoData.date }</p>
                <p>{ photoData.explanation }</p>
            </div> 
        </div>
        </>
    
    

    )
}