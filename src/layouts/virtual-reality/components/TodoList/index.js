


// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Table from "../../../../examples/Tables/Table";
import React, {useState} from "react";
import GalleryData from "./data/galleyData";
import {useGallery} from "../../../../context/useGallery";

function TodoList() {
    const {columns, rows} = GalleryData()
    const {setNum, galleryNum} = useGallery()
    const [iconCheck, setIconCheck] = useState(true);


    return (
    <Card sx={{ height: "100%", width: "200%" }}>
      <SoftBox p={4}>
        {/*<SoftBox display="flex" lineHeight={1}>*/}
        {/*  <SoftBox mr={2}>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      08:00*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*  <SoftBox>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      Synk up with Mark*/}
        {/*    </SoftTypography>*/}
        {/*    <SoftTypography variant="button" fontWeight="regular" color="secondary">*/}
        {/*      Hangouts*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*</SoftBox>*/}
        {/*<Divider />*/}
        {/*<SoftBox display="flex" lineHeight={0}>*/}
        {/*  <SoftBox mr={2}>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      09:30*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*  <SoftBox>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      Gym*/}
        {/*    </SoftTypography>*/}
        {/*    <SoftTypography variant="button" fontWeight="regular" color="secondary">*/}
        {/*      World Class*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*</SoftBox>*/}
        {/*<Divider />*/}
        {/*<SoftBox display="flex" lineHeight={1}>*/}
        {/*  <SoftBox mr={2}>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      11:00*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*  <SoftBox>*/}
        {/*    <SoftTypography variant="h6" fontWeight="medium">*/}
        {/*      Design Review*/}
        {/*    </SoftTypography>*/}
        {/*    <SoftTypography variant="button" fontWeight="regular" color="secondary">*/}
        {/*      Zoom*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftBox>*/}
        {/*</SoftBox>*/}


          <SoftBox
              sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                              `${borderWidth[1]} solid ${borderColor}`,
                      },
                  },
              }}
          >
              <Table columns={columns} rows={rows} />
          </SoftBox>




      </SoftBox>
      <SoftBox bgColor="grey-100" mt="auto">
          {
              (iconCheck)?( <Tooltip title="Show More" placement="top" sx={{ cursor: "pointer" }}>
                  <SoftBox textAlign="center" py={0.5} color="info" lineHeight={0}>
                      <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default" onClick={()=>{
                          setNum(galleryNum)
                          setIconCheck(false)
                      }}>
                          keyboard_arrow_down
                      </Icon>
                  </SoftBox>
              </Tooltip>):(
                  <Tooltip title="Show Less" placement="top" sx={{ cursor: "pointer" }}>
                      <SoftBox textAlign="center" py={0.5} color="info" lineHeight={0}>
                          <Icon sx={{ fontWeight: "bold" }} color="inherit" fontSize="default" onClick={()=>{
                              setNum(15)
                              setIconCheck(true)
                          }}>
                              keyboard_arrow_up
                          </Icon>
                      </SoftBox>
                  </Tooltip>
              )
          }


      </SoftBox>
    </Card>
  );
}

export default TodoList;
