import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import UploadImage from "./extra/UploadImage";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "../../components/SoftButton";
import {Alert} from "@mui/material";
import Table from "../../examples/Tables/Table";
import ImageData from "./extra/imageData";
import Notifications from "./extra/notifications";
import SoftModal from "../../components/SoftModal";


const EditUserPage = () => {

    // VARIABLES
    const {user_id} = useParams()
    const [userData, setUserData] = useState({})
    const [alert, setAlert] = useState(null);
    const [alertDelete, setAlertDelete] = useState(null);
    const navigate = useNavigate()
    const {columns, rows}= ImageData(user_id)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const server_url = process.env.REACT_APP_SERVER_API_URL


    // GET DATA FROM DATABASE USING THE ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.post(`${server_url}/getuser`, { user_id });
                const userData = response.data;
                setUserData(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [user_id]);


    const handleFormSubmit = async (updatedUserData) => {
        try {
            // Send updatedUserData to the server to update user data
          const response = await axios.put(`${server_url}/users/${user_id}`, updatedUserData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
          if (response.status === 200){
              setAlert(true)
          } else {
              setAlert(false)
          }

        } catch (error) {
            console.error('Error updating user data:', error);

        }
        window.location.reload()
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`${server_url}/users/${user_id}`);
            if (response.status === 200){
                setAlertDelete(true)
                navigate("/users")

            } else {
                setAlertDelete(false)
            }
            window.location.reload()

        } catch (error) {
            console.error('Error updating user data:', error);

        }
    };

    const AlertLogic = ({message1, message2}) => {
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
                return undefined
        }
    }

    const AlertDeleteLogic = ({message1, message2}) => {
        switch (alertDelete) {
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
                return undefined
        }
    }


    // MODAL CONFIRMATION COMPONENT




    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftModal/>
            <SoftBox py={0}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox p={3} mb={1} textAlign="center">
                            <SoftTypography variant="h2" fontWeight="bold" mb={3} fontStyle={'italic'}>
                                EDIT USER
                            </SoftTypography>
                            <SoftBox component="form" role="form">
                                <SoftBox  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} >
                                    <SoftBox mb={2} mx={1} shadow={'enable'} width={"50%"}>
                                        <SoftTypography fontSize={'small'} textAlign={'left'} variiant={'h6'} fontWeight={'bold'}>username:</SoftTypography>
                                        <SoftInput type="text" value={userData.username || ''} label={"email"} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                    </SoftBox>
                                <SoftBox mb={2} mx={1} shadow={'enable'} width={"50%"}>
                                    <SoftTypography fontSize={'small'} textAlign={'left'} variiant={'h6'} fontWeight={'bold'}>email:</SoftTypography>
                                    <SoftInput type="text" value={userData.email || ''} label={"email"} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                </SoftBox>
                                <SoftBox mb={2} mx={1} width={"50%"}>
                                    <SoftTypography fontSize={'small'} textAlign={'left'} variiant={'h6'} fontWeight={'bold'}>password:</SoftTypography>
                                    <SoftInput type="text" value={userData.password || ''}  onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                </SoftBox>
                                <SoftBox mb={2} mx={1} width={"50%"}>
                                    <SoftTypography fontSize={'small'} textAlign={'left'} variiant={'h6'} fontWeight={'bold'}>payment status:</SoftTypography>
                                    <Select value={userData.paymentStatus || ''} onChange={(e) => setUserData({ ...userData, paymentStatus: e.target.value })}>
                                        <MenuItem value={"paid"}>Paid</MenuItem>
                                        <MenuItem value={"pending"}>Pending</MenuItem>
                                    </Select>
                                </SoftBox>
                                </SoftBox>
                                <SoftBox mb={0} mx={1} width={"100%"}>
                                    <SoftButton size={'small'} color={"success"} sx={{marginRight:3}} onClick={() => {
                                        handleFormSubmit(userData)}
                                    } >Save Changes</SoftButton>
                                    <SoftButton size={'small'} color={"error"} sx={{marginLeft:3}} onClick={()=>{
                                        setMessage('user')
                                        setOpen(true)
                                    }}  >Remove User</SoftButton>
                                </SoftBox>
                            </SoftBox>
                                <AlertLogic message1={"User Data Successfully Updated"} message2={"Error In Communication"}></AlertLogic>
                                <AlertDeleteLogic message1={"User Deleted Successfully "} message2={"Error In Communication"}></AlertDeleteLogic>

                                <SoftModal open={open} setOpen={setOpen} message={message} handleDelete={handleDeleteUser}/>

                            {/* Example: File input for uploading pictures */}
                            <UploadImage userId={user_id} />



                        </SoftBox>
                        <Notifications userId={user_id} />

                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Client Images Table</SoftTypography>
                        </SoftBox>
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
                    </Card>
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
    );

}

export default EditUserPage;
