import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOptions from "../headeroptions/HeaderOptions";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const onLogout = () => {
        auth.signOut();
        dispatch(logout());
    };
    return (
        <div className="header">
            <div className="header_left">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt=""
                />
                <div className="header_search">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="header_right">
                <HeaderOptions Icon={HomeIcon} title="Home" />
                <HeaderOptions
                    Icon={SupervisorAccountIcon}
                    title="My network"
                />
                <HeaderOptions Icon={BusinessCenterIcon} title="Job" />
                <HeaderOptions Icon={ChatIcon} title="Messaging" />
                <HeaderOptions Icon={NotificationsIcon} title="Notification" />
                <HeaderOptions
                    onLogout={onLogout}
                    avatar={user ? user.photoURL : "user"}
                    title={user ? user.displayName : "Unknown"}
                />
            </div>
        </div>
    );
};

export default Header;
