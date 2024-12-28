import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../../../components/SoftButton";
import {useGallery} from "../../../../../context/useGallery";
import SoftModal from "../../../../../components/SoftModal";
import {useSearch} from "../../../../../context/useSearchQuery";


// COMPONENT AND FUNCTIONS
function Author({ name, email }) {
    return (
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
            <SoftBox display="flex" flexDirection="column">
                <SoftTypography variant="button" fontWeight="medium">
                    {name}
                </SoftTypography>
                <SoftTypography variant="caption" color="secondary">
                    {email}
                </SoftTypography>
            </SoftBox>
        </SoftBox>
    );
}


const GalleryData = () => {

    // VARIABLES INITIALIZATION
    const [gallery, setGallery] = useState([]);
    const {num, setGalleryNum} = useGallery()
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState({});
    const server_url = process.env.REACT_APP_SERVER_API_URL
    const {searchQuery} = useSearch();


    // DELETING FILES FROM GALLERY
    const handleDeleteFileFromGallery = async (imageId) => {
        try {
            const response = await axios.delete(`${server_url}/gallery/${imageId}`);
            if (response.status === 200) {
                setGallery(gallery.filter((image) => image.id !== imageId));
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    // GETTING DATA FROM THE SERVERS
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = axios.get(`${server_url}/gallery`)
                console.log(response)
                let fetchedImages = (await response).data.gallery;
                if (searchQuery){
                    fetchedImages = fetchedImages.filter((image) => image.image_name.toLowerCase().includes(searchQuery.toLowerCase()))
                    setGallery(fetchedImages)
                }
                setGallery(fetchedImages)


            } catch (error) {
                console.error('Error Fetching Images')
            }

        }

        fetchGallery();

    }, [searchQuery, setGallery, server_url]);

    useEffect(() => {
        setGalleryNum(gallery.length)
    }, [gallery, setGallery]);

    // Update rows with fetched users



    const rows = (gallery.slice(0, num).reverse()).map((image) => {
        return {
            gallery_name: <Author name={image.image_name}  />,
            created_at: (
                <SoftBadge variant="gradient" badgeContent={new Date(image.created_at).toLocaleDateString('default',{
                    year: "numeric",
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: '2-digit'
                })} size="xs" container />
            ),

            action: (
                <>
                    <SoftButton
                        component="a"
                        color="error"
                        size={'small'}
                        fontWeight="medium"
                        onClick={() =>{
                            setImageData({name: image.image_name,
                            id: image.id})
                            setOpen(true)
                        }
                    }
                    >
                        Remove
                    </SoftButton>
                     <SoftModal open={open} setOpen={setOpen}
                                              message={imageData.name}
                                              handleDelete={()=>
                                                  handleDeleteFileFromGallery(imageData.id)}>

                        </SoftModal>


                </>

            )
        }
    })
    const columns = [
        { name: "gallery_name", align: "center" },
        { name: "created_at", align: "center" },
        { name: "action", align: "center" },
    ]

    return { columns, rows };
}

export default GalleryData
