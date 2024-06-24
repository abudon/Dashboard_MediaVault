 import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
//import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../components/SoftButton";
 import SoftModal from "../../../components/SoftModal";



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


const ImageData = (userId) => {

    // VARIABLES INITIALIZATION
    const [images, setImages] = useState([]);
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility



    // DELETING IMAGES
    const handleDeleteImage = async (imageId) => {
        try {
            await axios.delete(`https://backendmediavault-production.up.railway.app/images/${imageId}`);
            setImages(images.filter((image) => image.id !== imageId));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    // GETTING DATA FROM THE SERVERS
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = axios.get(`https://backendmediavault-production.up.railway.app/images/${userId}`)
                const fetchedImages = (await response).data.images
                setImages(fetchedImages)
            } catch (error) {
                console.error('Error Fetching Images')
            }

        }

        fetchImage();

    }, []);

    // Update rows with fetched users

    const rows = images.map((image) => {
        return {
            image_name: <Author name={image.image_name}  />,
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
                    onClick={() => setOpenModal(true)}
                >
                    Remove
                </SoftButton>
                    <SoftModal
                        open={openModal}
                        setOpen={setOpenModal}
                        message={`image ${image.image_name}`} // Pass the appropriate message
                        handleDelete={() => handleDeleteImage(image.id)} // Pass the appropriate delete function
                    />

                </>
            )
        }
    })
    const columns = [
        { name: "image_name", align: "center" },
        { name: "created_at", align: "center" },
        { name: "action", align: "center" },
    ]

    return { columns, rows };
}

export default ImageData
