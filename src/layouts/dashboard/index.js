

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// import Projects from "layouts/dashboard/components/Projects";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

// Context
import {useLoginConext} from "../../context/loggingConxtext";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Dashboard() {
  const [usersNumber, setUsersNumber] = useState(null);
  const [bookingNumber, setBookingNumber] = useState(null)
  const [paidUsers, setPaidUsers] = useState([]);
  const {username} = useLoginConext()
  const navigate = useNavigate()
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  let count = 0


  useEffect(() => {

    if (!username) {
      // Navigate to the dashboard route if user is logged in
      navigate('/authentication/sign-in');
    }

    const fetchUsers = async ()=>{
      try {
        const response = axios.get("https://backendmediavault-production.up.railway.app/users");
        const number = (await response).data.users.length
        const users = (await response).data.users
        setPaidUsers(users)
        setUsersNumber(number)
      }catch (error){
        console.error(error)
      }
    }
    fetchUsers()

  const fetchBookingList = async ()=>{
    try {
      const response = axios.get("https://backendmediavault-production.up.railway.app/booking-list");
      const number = (await response).data.bookingLists.length
      setBookingNumber(number)
    }catch (error){
      console.error(error)
    }
  }
  fetchBookingList()

}, []);

 paidUsers.map(item => {
   if (item.paymentStatus==="paid") {
     count = count + 1
   } return count})



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Booking List" }}
                count={bookingNumber}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Users" }}
                count={usersNumber}
                percentage={{ color: "secondary", text: "" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Successful Payment" }}
                count={count}
                percentage={{ color: "success", text: "" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/*<Grid item xs={12} lg={7}>*/}
            {/*  <BuildByDevelopers />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12} lg={5}>*/}
            {/*  <WorkWithTheRockets />*/}
            {/*</Grid>*/}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <Projects />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <OrderOverview />*/}
          {/*</Grid>*/}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
