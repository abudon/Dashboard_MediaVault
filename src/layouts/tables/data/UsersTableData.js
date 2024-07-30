
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../components/SoftButton";



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


const UsersData = () => {

  // VARIABLES INITIALIZATION
  const [users, setUsers] = useState([]);




  // GETTING DATA FROM THE SERVERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = axios.get(`${process.env.REACT_APP_SERVER_API_URL}/users`)
        const fetchedUsers = (await response).data.users
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Error Fetching Users')
      }

    }
      fetchUsers();

  }, [users]);

  // Update rows with fetched users

  const rows = users.map((user) => {
  return {
    username: <Author name={user.username} email={user.email} />,
    payment_status: (
        <SoftBadge variant="gradient" badgeContent={user.paymentStatus} color={user.paymentStatus === 'pending' ? "danger": "success"} size="xs" container />
    ),
    role: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {user.role}
        </SoftTypography>
    ),
    action: (
        <SoftButton
            size={'small'}
            color={'secondary'}
            variant={'gradient'}
            href={`/users/edit/${user.id}`}
        >
          Edit
        </SoftButton>
    )
  }
  })
 const columns = [
   { name: "username", align: "center" },
   { name: "payment_status", align: "center" },
   { name: "role", align: "center" },
   { name: "action", align: "center" },
 ]

  return { columns, rows };
}

export default UsersData
























// function Author({  name, email }) {
//
//
//
//   useEffect(() => {
//     // Define a function to fetch users from the server
//     const fetchUsers = async () => {
//       try {
//         // Make an HTTP GET request to the /users endpoint
//         const response = await axios.get('http://localhost:8000/users');
//
//         // Extract the users from the response data
//         const fetchedUsers = response.data.users;
//
//         // Update the state with the fetched users
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//
//     // Call the fetchUsers function when the component mounts
//     fetchUsers();
//   }, []); // Pass an emp
//   console.log('this si the users:',users)
//
//   return (
//     <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
//       {/*<SoftBox mr={2}>*/}
//       {/*  <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />*/}
//       {/*</SoftBox>*/}
//       <SoftBox display="flex" flexDirection="column">
//         <SoftTypography variant="button" fontWeight="medium">
//           {name}
//         </SoftTypography>
//         <SoftTypography variant="caption" color="secondary">
//           {email}
//         </SoftTypography>
//       </SoftBox>
//     </SoftBox>
//   );
// }
//
// // function Function({ job, org }) {
// //   return (
// //     <SoftBox display="flex" flexDirection="column">
// //       <SoftTypography variant="caption" fontWeight="medium" color="text">
// //         {job}
// //       </SoftTypography>
// //       <SoftTypography variant="caption" color="secondary">
// //         {org}
// //       </SoftTypography>
// //     </SoftBox>
// //   );
// // }
//
// const authorsTableData = {
//   columns: [
//     { name: "username", align: "center" },
//     // { name: "function", align: "left" },
//     { name: "payment_status", align: "center" },
//     { name: "role", align: "center" },
//     { name: "action", align: "center" },
//   ],
//
//   rows: [
//     {
//       username: <Author  name="John Michael" email="john@creative-tim.com" />,
//       payment_status: (
//         <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
//       ),
//       role: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           23/04/18
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//     {
//       username: <Author  name="Alexa Liras" email="alexa@creative-tim.com" />,
//       status: (
//         <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
//       ),
//       employed: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           11/01/19
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//     {
//       username: <Author  name="Laurent Perrier" email="laurent@creative-tim.com" />,
//       status: (
//         <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
//       ),
//       employed: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           19/09/17
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//     {
//       username: <Author  name="Michael Levi" email="michael@creative-tim.com" />,
//       status: (
//         <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
//       ),
//       employed: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           24/12/08
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//     {
//       username: <Author  name="Richard Gran" email="richard@creative-tim.com" />,
//       status: (
//         <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
//       ),
//       employed: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           04/10/21
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//     {
//       username: <Author  name="Miriam Eric" email="miriam@creative-tim.com" />,
//       status: (
//         <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
//       ),
//       employed: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           14/09/20
//         </SoftTypography>
//       ),
//       action: (
//         <SoftTypography
//           component="a"
//           href="#"
//           variant="caption"
//           color="secondary"
//           fontWeight="medium"
//         >
//           Edit
//         </SoftTypography>
//       ),
//     },
//   ],
// };
//
// export default authorsTableData;
