import React, { useEffect, useState } from "react";
import "./feed.css";
import CreateIcon from "@mui/icons-material/Create";
import SendIcon from "@mui/icons-material/Send";
import InputOptions from "../inputoptions/InputOptions";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../post/Post";
import { db } from "../../firebase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "@firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

const Feed = () => {
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const q = query(
            collection(db, "linkedin-posts"),
            orderBy("timestamp", "desc")
        );
        const unSubscribe = onSnapshot(q, (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
        return () => {
            unSubscribe();
        };
    }, []);
    const sendPost = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            addDoc(collection(db, "linkedin-posts"), {
                name: user.displayName,
                description: user.email,
                message: message,
                photoUrl: user.photoURL,
                timestamp: serverTimestamp(),
            }).then(setMessage(""));
        }
    };
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendPost} type="submit">
                            <SendIcon />
                        </button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOptions
                        title="Photo"
                        Icon={ImageIcon}
                        color="#70B5F9"
                    />
                    <InputOptions
                        title="Video"
                        Icon={SubscriptionsIcon}
                        color="#E7A33C"
                    />
                    <InputOptions
                        title="Event"
                        Icon={EventNoteIcon}
                        color="#C0CBCD"
                    />
                    <InputOptions
                        title="Write article"
                        Icon={CalendarViewDayIcon}
                        color="#7FC15E"
                    />
                </div>
            </div>
            <FlipMove>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        name={post.data.name}
                        description={post.data.description}
                        message={post.data.message}
                        photoUrl={post.data.photoUrl}
                    />
                ))}
            </FlipMove>
        </div>
    );
};

export default Feed;
