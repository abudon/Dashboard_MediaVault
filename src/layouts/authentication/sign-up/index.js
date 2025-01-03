

import {useState} from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Select from '@mui/material/Select'
import MenuItem from "@mui/material/MenuItem";
import {Modal} from "@mui/material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved0.jpg";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




function SignUp() {
  // VARIABLES INITIALIZATION
  const [agreement, setAgreement] = useState(true);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const server_url = process.env.REACT_APP_SERVER_API_URL;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    backdrop: "60%",
    border: '2px solid dark-blue',
    boxShadow: 24,
    p: 4,
  };


// HANDLER FUNCTION INITIALIZATION

  const handleOpen = ()=>setOpen(true)
  const handleClose = ()=>setOpen(false)
  const handleSetAgreement = () => setAgreement(!agreement);
  const handleSetRole = (event)=> {
    setRole(event.target.value)
  }
  const handleOnChange = (event)=>{
    switch (event.target.type){
      case "text" :
       return  setUsername(event.target.value);
      case "email" :
        return  setEmail(event.target.value);
      case "password" : return setPassword(event.target.value);
      default: return null
    }

  }


  const handleFormSubmit= ()=>{



    const newData = {
      username : username,
      email: email,
      password: password,
      role: role
    }
    setErrors([]);


    axios.post(`${server_url}/signup`,newData)
        .then((response) => {

    if (response.data.user){

      setMessage("Your Account is Created Successfully")
      // Optionally, you can redirect the user to another page or show a success message
      handleOpen()
    } else {
      setMessage("Please Check Your Registration")
      // Optionally, you can redirect the user to another page or show a success message
      handleOpen()
    }


  }).catch((error) => {
        if (error.response && error.response.status === 400) {
          // Set validation errors from the backend
          setErrors(error.response.data.errors);
        } else {
          console.error('An unexpected error occurred:', error);
          setMessage("An unexpected error occurred. Please try again later.")
          handleOpen()
        }
      })

  }

  return (
    <BasicLayout
      title="Welcome To Prince Visuals Studio!"
      description="Where images becomes Live, and Pictures becomes Infinity."
      image={curved6}
    >

      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput icon={{
                component: "person",
                direction: "right"
              }} name={'username'} type="text"  placeholder="Username"  onChange={handleOnChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput icon={{
                component: "email",
                direction: "right"
              }
              } name={'email'}  type="email" placeholder="Email" onChange={handleOnChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                  icon={{
                    component: "password",
                    direction: "right"
                  }}
                  name={'password'}  type="password" placeholder="Password"  onChange={handleOnChange}/>
            </SoftBox>
            <SoftBox mb={2}>
              <Select
                  labelId="role"
                  id="role-select"
                  value={role}
                  label="Role"
                  onChange={handleSetRole}
              >
                <MenuItem value={'user'}>User</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={()=>{
                handleFormSubmit()
              } }
                          variant="gradient" color="dark" fullWidth>
                sign up
              </SoftButton>
              {
                errors.length > 0 &&
                  (
                    <SoftBox
                      borderRadius={'1rem'}
                      bgColor={'grey'}
                      opacity={1}
                      height={'auto'}
                      width={'100%'}
                      my={4}
                      px={3}
                      py={0.7}
                  >
                <SoftTypography
                    color={'error'}
                    fontWeight={'bold'}
                    fontSize={12}
                >Error:</SoftTypography>
                      <ul>
                        {
                          errors.map((error, index) => (
                             <li
                                  style={{
                                    mt: 1,
                                    fontSize: '0.8rem',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    lineHeight: '1.5',
                                    listStyleType: 'disc',
                                    marginLeft: '1rem',
                                    // hover
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                    "&:hover": {
                                      color: 'red',
                                    }
                                  }}
                                 key={index}>
                               {error}
                             </li>

                          ))
                        }
                      </ul>
                  </SoftBox>
              )
              }
              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                <Box sx={style}>

                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                  </Typography>
                </Box>
              </Modal>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
