import React, { useState } from 'react';
import axios from 'axios';
import SoftBox from "../../../components/SoftBox";
import {CloudUploadOutlined} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {Alert} from "@mui/material";
import {styled} from "@mui/material/styles";

function UploadImage({ userId }) {
    const [alert, setAlert] = useState(null);

    const handleFileChangeAndUpload = async (event) => {
        const files = event.target.files;
        if (files.length === 0) {
            console.error('No files selected');
            return;
        }

        const formData = new FormData();
        // Append each selected file to the FormData object
        for (const file of files) {
            formData.append('files', file);
        }

        try {
            const response = await axios.post(`https://backendmediavault-production.up.railway.app/upload/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setAlert(true);
            } else {
                setAlert(false);
            }

            console.log('Files uploaded successfully:', response.data);

        } catch (error) {
            console.error('Error uploading files:', error);
            setAlert(false);
        }
    };

    const AlertUpload = ({message1, message2}) => {
        switch (alert) {
            case true:
                return (<Alert severity="success" onClose={() => {
                    setAlert(null)
                }}>
                    {message1}
                </Alert>);
            case false :
                return (<Alert severity="error" onClose={() => {
                    setAlert(null)
                }}>
                    { message2}
                </Alert>);
            case null :
                return undefined;
            default :
                return undefined;
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <SoftBox>
            <SoftBox my={3} />

            <SoftButton
                variant={'contained'}
                component={"label"}
                role={undefined}
                tabIndex={-1}
                startIcon={<CloudUploadOutlined />}
                color={"info"}
                mt={3}
                size={"small"}
            >
                Upload User File
                <VisuallyHiddenInput type={'file'} multiple onChange={handleFileChangeAndUpload} />
            </SoftButton>

            <AlertUpload message1={"Images Uploaded Successfully"} message2={"Error Uploading Images"} />
        </SoftBox>
    );
}

export default UploadImage;
