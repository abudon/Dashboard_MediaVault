import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftButton from "../../../components/SoftButton";
import SoftTextarea from "../../../components/SoftTextArea";
import axios from "axios";
import { useState} from "react";


const Notifications = (props) => {
    const {userId} = props
    const [message, setMessage] = useState('');
    const server_url = process.env.REACT_APP_SERVER_API_URL


    const onchange = (event)=>{
        setMessage(event.target.value)
        console.log(message)
    }

    const click = async ()=>{
        try{

            const response = await axios.post(`${server_url}/notifications`, { userId: userId, message: message });
                if (response.status === 201){
                    console.log('successful')
                    alert("message sent to user successfully")
                    setMessage("")
                }else {
                    console.log("something went wrong")
                }
        }catch(e){
            console.error(e)
        }
    }

    return(
        <>
            <SoftBox width={"100"} shadow={"md"} sx={{
                padding: "10px",
                margin: "20px 5px"
            }}  borderRadius={'xm'} >
                <SoftTypography fontSize={'small'} fontWeight={'bold'}>Message:</SoftTypography>
                <SoftBox sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <SoftTextarea sx={{marginRight: "10px"}} value={message} onChange={onchange}></SoftTextarea>
                    <SoftButton color={'info'} sx={{marginLeft: "10px"}} variant={"gradient"} onClick={click}>Send Message</SoftButton>
                </SoftBox>


            </SoftBox>
        </>
    )
}
export default Notifications
