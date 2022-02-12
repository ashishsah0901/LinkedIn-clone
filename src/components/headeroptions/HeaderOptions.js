import React from "react";
import "./headeroption.css";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";

const HeaderOptions = (props) => {
    return (
        <div onClick={props.onLogout} className="headeroption">
            {props.Icon && (
                <Badge
                    className="headeroptions_badge"
                    color="secondary"
                    badgeContent={5}
                >
                    <props.Icon className="headeroption_icon" />
                </Badge>
            )}
            {props.avatar && (
                <Avatar className="headeroption_icon" src={props.avatar} />
            )}
            <h3 className="headeroption_title">{props.title}</h3>
        </div>
    );
};

export default HeaderOptions;
