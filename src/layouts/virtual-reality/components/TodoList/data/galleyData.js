import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../../../components/SoftButton";
import {useGallery} from "../../../../../context/useGallery";
import SoftModal from "../../../../../components/SoftModal";



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
    const {num, setGalleryNum, galleryNum} = useGallery()
    const [open, setOpen] = useState(false);


    // DELETING FILES FROM GALLERY
    const handleDeleteFileFromGallery = async (imageId) => {
        try {
            const response = await axios.delete(`https://backendmediavault-production.up.railway.app/gallery/${imageId}`);
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
                const response = axios.get(`https://backendmediavault-production.up.railway.app/gallery`)
                const fetchedImages = (await response).data.galleryItems
                setGallery(fetchedImages)


            } catch (error) {
                console.error('Error Fetching Images')
            }

        }

        fetchGallery();

    }, []);

    useEffect(() => {
        console.log(gallery.length)
        setGalleryNum(gallery.length)
    }, [gallery]);

    // Update rows with fetched users



    const rows = gallery.slice(0, num).reverse().map((image) => {
        return {
            gallery_name: <Author name={image.image_name}  />,
            created_at: (
                <SoftBadge variant="gradient" badgeContent={image.created_at} size="xs" container />
            ),

            action: (
                <>
                    <SoftButton
                        component="a"
                        color="error"
                        size={'small'}
                        fontWeight="medium"
                        onClick={() =>setOpen(true)}
                    >
                        Remove
                    </SoftButton>
                    <SoftModal open={open} setOpen={setOpen} message={image.image_name} handleDelete={()=>handleDeleteFileFromGallery(image.id)}></SoftModal>
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
