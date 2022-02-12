import React, { forwardRef } from "react";
import "./post.css";
import { Avatar } from "@mui/material";
import InputOptions from "../inputoptions/InputOptions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Post = forwardRef((props, ref) => {
    const { name, description, message, photoUrl } = props;
    return (
        <div ref={ref} className="post">
            <div className="post_header">
                <Avatar src={photoUrl} />
                <div className="post_info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post_body">
                <p>{message}</p>
            </div>
            <div className="post_buttons">
                <InputOptions color="green" Icon={ThumbUpIcon} title="Like" />
                <InputOptions
                    color="blue"
                    Icon={ChatOutlinedIcon}
                    title="Comment"
                />
                <InputOptions
                    color="black"
                    Icon={ShareOutlinedIcon}
                    title="Share"
                />
                <InputOptions
                    color="skyblue"
                    Icon={SendOutlinedIcon}
                    title="Send"
                />
            </div>
        </div>
    );
});

export default Post;
