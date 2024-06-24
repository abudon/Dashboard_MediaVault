
// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Gallery from "layouts/virtual-reality";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "./layouts/authentication/sign-out";
import EditUserPage from "./layouts/Editors";
import BookingList from "./layouts/booking-list";

// Soft UI Dashboard React icons
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import {
  AppRegistration,
  Bookmarks,
  Camera, CancelOutlined,
  DashboardTwoTone,
  ExitToApp,
  PeopleAltOutlined,
  Signpost
} from "@mui/icons-material";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardTwoTone size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <PeopleAltOutlined size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Booking List",
    key: "booking-list",
    route: "/booking-list",
    icon: <Bookmarks size="12px" />,
    component: <BookingList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Gallery",
    key: "gallery",
    route: "/gallery",
    icon: <Camera size="12px" />,
    component: <Gallery />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Signpost size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <AppRegistration size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: <ExitToApp size="12px" />,
    component: <SignOut />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Edit User",
    key: "edit-user",
    route: "/users/edit/:user_id",
    icon: <CancelOutlined size="12px" />,
    component: <EditUserPage />,
    noCollapse: true,
  },
];

export default routes;
