import React, { useState } from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import axios from "axios";
import { Triangle } from "react-loader-spinner";

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

function TodoCard() {
  const server_url = process.env.REACT_APP_SERVER_API_URL;
  const [loading, setLoading] = useState(false);

  const handleFileChangeAndUpload = async (event) => {
    const formData = new FormData();
    const files = event.target.files;
    setLoading(true);

    for (const file of files) {
      formData.append('files', file); // Append all files directly to the form data
    }

    try {
      // Send the FormData object containing the files to the backend
      const response = await axios.post(`${server_url}/gallery/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
    } catch (e) {
      console.error('Error uploading files:', e);
    }
    setLoading(false);
    window.location.reload();
  };

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
              {
                loading ? (
                    <SoftBox
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: "100%"
                        }}
                    >
                      <Triangle
                          visible={true}
                          height="80"
                          width="80"
                          color="#fff"
                          ariaLabel="triangle-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                      />
                    </SoftBox>
                ) : (
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" multiple onChange={handleFileChangeAndUpload} />
                    </Button>
                )
              }
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
