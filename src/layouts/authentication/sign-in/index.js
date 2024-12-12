

import {useEffect, useState} from "react";

// react-router-dom components
import {useNavigate} from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/vr-bg.jpg";

// Context
import {useLoginContext} from "../../../context/loggingConxtext";
import axios from "axios";
import {Alert} from "@mui/material";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const { username, setUsername} = useLoginContext()
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    console.log('Username updated:', username);
  }, [username]); // useEffect will trigger whenever username changes

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleonChange = (event)=>{
    switch (event.target.type) {
      case 'email':
        return setEmail(event.target.value);
      case 'password' :
        return setPassword(event.target.value);
      default:
        return null
    }
  }

  const fetchUser = async (email, password) => {

    try {
      // Send a POST request to the backend endpoint with the provided email and password
      const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/signin`, { email, password });

      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        // Return the user data from the response
        return response.data.user;
      } else {
        // If the request was not successful, log an error and return null
        console.error('Failed to fetch user:', response.statusText);
        return null;
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching user:', error.message);
      return null;
    }
  };

  const handleLogin = async ()=>{

    // Fetch the user using the provided email and password
    const user = await fetchUser(email, password);


    if (user && user.role === "admin") {
      // User was successfully fetched, proceed with further actions (e.g., redirect to dashboard)
      setUsername(user.username)
      localStorage.setItem('admin', JSON.stringify(user))
      navigate('/dashboard')

    } else {
      setAlert(false)
      console.error('Authentication failed');
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('admin')
    const storedUser2 = localStorage.getItem('adminClient')
    if (storedUser){
      const user = JSON.parse(storedUser)
      setUsername(user.username)
      navigate('/dashboard');
    }else if (storedUser2){
      const user = JSON.parse(storedUser2)
      setUsername(user.username)
      navigate("/dashboard")
    }

  }, []);



  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        {
          alert === false ? (<Alert severity="warning" onClose={() => {
            setAlert(null)
          }}>
            Wrong Email or Password or Admin Authorization Only
          </Alert>) : undefined
        }
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput onChange={handleonChange} type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput onChange={handleonChange} type="password" placeholder="Password" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={handleLogin} variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
