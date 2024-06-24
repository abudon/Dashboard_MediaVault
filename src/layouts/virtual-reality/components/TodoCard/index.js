

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";


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


const handleFileChange = async (event) => {
  const formData = new FormData();
  // Append each selected file to the FormData object
  for (const file of event.target.files) {
    formData.append('files', file);
  }

  try {
    // Send the FormData object containing the files to the backend
    const response = await axios.post('https://backendmediavault-production.up.railway.app/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Files uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

function TodoCard() {
  return (
    <Card>
      <SoftBox bgColor="dark" variant="gradient">
        <SoftBox p={3}>
          <SoftBox display="flex" justifyContent="space-between">
            <SoftTypography variant="h5" color="white">
              Upload Files
            </SoftTypography>

          </SoftBox>
          <SoftBox textAlign="center" lineHeight={1} my={3}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" multiple onChange={handleFileChange}/>
            </Button>
          </SoftBox>
        </SoftBox>
        <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
          <SoftBox textAlign="center" color="white" py={0.5} lineHeight={0}>
            <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default">
              keyboard_arrow_down
            </Icon>
          </SoftBox>
        </Tooltip>
      </SoftBox>
    </Card>
  );
}

export default TodoCard;
