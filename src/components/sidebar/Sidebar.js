import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.css";
import { selectUser } from "../../features/userSlice";

const Sidebar = () => {
    const user = useSelector(selectUser);
    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className="sidebar_hash">#</span>
            <p>{topic}</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img
                    src="https://images.unsplash.com/photo-1504712375254-d54f14d89508?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNtb290aCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                    alt=""
                />
                <Avatar src={user.photoURL} className="sidebar_avatar" />
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className="sidebar_stats">
                <div className="sidebar_stat">
                    <p>Who viewed you</p>
                    <p className="sidebar_statNumber">1,375</p>
                </div>
                <div className="sidebar_stat">
                    <p>Views on post</p>
                    <p className="sidebar_statNumber">2,926</p>
                </div>
            </div>
            <div className="sidebar_bottom">
                <p>Recent</p>
                {recentItem("ReactJS")}
                {recentItem("AngularJS")}
                {recentItem("NodeJS")}
                {recentItem("MongoDB")}
                {recentItem("Firebase")}
            </div>
        </div>
    );
};

export default Sidebar;
