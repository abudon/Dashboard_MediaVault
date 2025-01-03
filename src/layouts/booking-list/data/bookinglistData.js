import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import {useEffect, useState} from "react";
import axios from "axios";
import SoftButton from "../../../components/SoftButton";
import {useSearch} from "../../../context/useSearchQuery";


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


const BookingListData = () => {

    // VARIABLES INITIALIZATION
    const [books, setBooks] = useState([]);
    const server_url = process.env.REACT_APP_SERVER_API_URL
    const context = useSearch();
    const {searchQuery} = context;




        const handleUpdateBookingStatus = async ( bookingId , bookingStatus) => {
            try {
                // Send the updated booking status to the server
                const response = await axios.put(`${server_url}/booking-list/${bookingId}`, {booking_status: bookingStatus});

                // Handle the success response
                console.log('Booking status updated successfully:', response.data);
                window.location.reload()

            } catch (error) {
                // Handle errors
                console.error('Error updating booking status:', error);
            }
        }





    // GETTING DATA FROM THE SERVERS
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = axios.get(`${server_url}/booking-list`)
                let fetchedBook = (await response).data.bookings;
                if (searchQuery){
                    fetchedBook = fetchedBook.filter(item=>item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.session_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.specific_requirements.toLowerCase().includes(searchQuery.toLowerCase()))
                    setBooks(fetchedBook)
                }
                setBooks(fetchedBook)

                console.log(fetchedBook)
            } catch (error) {
                console.error('Error Fetching Users')
            }

        }
        fetchBooking();

    }, [searchQuery, server_url]);

    const determineColor = (status) => {
        switch (status) {
            case 'pending':
                return "warning";
            case "confirmed":
                return "success";
            case "canceled":
                return "error";
            default:
                return "warning";
        }
    };

    // Update rows with fetched users

    const rows = books.map((book) => {
        return {
            name: <Author name={book.customer_name} email={book.email} />,
            contact:(
                <Author name={book.phone_number} email={book.home_address} />
            ),
            session: (
                <Author name={book.session_type} email={book.specific_requirements} />
            ),
            booking_datetime: (
                <SoftBadge variant="gradient"
                           badgeContent={new Date(book.booking_datetime).toLocaleDateString('default',{
                               year: 'numeric',
                               month: 'short',
                               day: 'numeric',
                               hour: 'numeric',
                               minute: 'numeric',
                               second: 'numeric'
                           })}  size="xs" container />
            ),
            booking_status:(
                <SoftBadge
                    variant="gradient"
                    badgeContent={book.booking_status}
                    color={determineColor(book.booking_status)} // Pass the determined color
                    size="xs"
                    container
                />),
            start_time:(
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                    {book.start_time}
                </SoftTypography>
            ),
            end_time:(
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                    {book.end_time}
                </SoftTypography>
            ),
            username:(
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                    {book.user.username}
                </SoftTypography>
            ),
            action: (
                <SoftBox>
                <SoftButton
                    component="a"
                    color="success"
                    size={'small'}
                    fontWeight="medium"
                    sx={{
                        margin: "0 5px"
                    }}
                    onClick={()=>handleUpdateBookingStatus(book.id, 'confirmed')}
                >
                    Confirmed
                </SoftButton>
        <SoftButton
            component="a"
            color="error"
            size={'small'}
            fontWeight="medium"
            onClick={()=>handleUpdateBookingStatus(book.id, 'canceled')}

        >
            Cancel
        </SoftButton>
                </SoftBox>
            )
        }
    })
    const columns = [
        { name: "name", align: "center" },
        { name: "contact", align: "left" },
        { name: "session", align: "center" },
        { name: "booking_datetime", align: "center" },
        { name: "booking_status", align: "center" },
        { name: "start_time", align: "center" },
        { name: "end_time", align: "center" },
        { name: "username", align: "center" },
        { name: "action", align: "center" },
    ]

    return { columns, rows };
}

export default BookingListData
