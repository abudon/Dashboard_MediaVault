import React, {createContext, useContext, useState} from 'react'




const galleryNumber = createContext({})

export  const NumberProvider = ({children}) => {
    const [num, setNum] = useState(10);
    const [galleryNum, setGalleryNum] = useState(0);
    return(
        <galleryNumber.Provider value={{num, setNum, galleryNum, setGalleryNum}}>
            {children}
        </galleryNumber.Provider>
    )

}

export const useGallery = () => {
    const data = useContext(galleryNumber)
    if (data) return data;
}
