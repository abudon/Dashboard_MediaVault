
import React, {useEffect, useRef, useState} from 'react'

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
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import {Triangle} from "react-loader-spinner";


const ffmpeg = new FFmpeg();
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


  const server_url = process.env.REACT_APP_SERVER_API_URL
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFFmpeg = async () => {
      await ffmpeg.load({
        corePath: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.js',
        wasmPath: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.wasm',
      });
    };
    loadFFmpeg();
  }, []);
  const handleFileChangeAndUpload = async (event) => {
    const formData = new FormData();
    const files = event.target.files;
    setLoading(true);

    for (const file of files) {
      const fileType = file.type.split('/')[0];

      if (fileType === 'video') {
        try {
          // TRANSCODE THE VIDEO
          await ffmpeg.writeFile('input.webm', await fetchFile(file));
          await ffmpeg.exec(['-i', 'input.webm', '-c:v', 'libx264', '-c:a', 'aac', '-f', 'mp4', 'output.mp4']);
          const outputBuffer = await ffmpeg.readFile('output.mp4');
          const transcodeFile = new Blob([outputBuffer.buffer], { type: 'video/mp4' });
          formData.append('files', transcodeFile, file.name.replace(/\.[^/.]+$/, "") + '.mp4');

        }catch (e) {
          console.error("Can not Transcode",e)
        }


      } else if (fileType === 'image') {
        // APPEND IMAGES TO FORM DATA
        formData.append('files', file);
      }
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
              ):(
                  <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput type="file" multiple onChange={handleFileChangeAndUpload}/>
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
