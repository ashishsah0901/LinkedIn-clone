import React, { useState } from "react";
import "./login.css";
import { auth } from "../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "@firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const [loginState, setLoginState] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [cPassword, setCPassword] = useState("");
    const register = () => {
        setLoginState(!loginState);
        cleanStates();
    };
    const loginOrSignup = (e) => {
        e.preventDefault();
        if (loginState) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userAuth) => {
                    dispatch(
                        login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: userAuth.user.displayName,
                            photoURL: userAuth.user.photoURL,
                        })
                    );
                    cleanStates();
                })
                .catch((err) => alert(err));
        } else {
            if (!name) {
                return alert("Please enter your name");
            }
            if (password !== cPassword) {
                return alert("Password doesn't match");
            }
            createUserWithEmailAndPassword(auth, email, password).then(
                (userAuth) => {
                    updateProfile(userAuth.user, {
                        displayName: name,
                        photoURL:
                            photoUrl === ""
                                ? photoUrl
                                : "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c21vb3RoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                    }).then(() => {
                        dispatch(
                            login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: name,
                                photoURL: photoUrl,
                            })
                        );
                        cleanStates();
                    });
                }
            );
        }
    };
    const cleanStates = () => {
        setEmail("");
        setPassword("");
        setCPassword("");
        setName("");
        setPhotoUrl("");
    };
    return (
        <div className="login">
            <img
                src="https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-16.png"
                alt=""
            ></img>
            <form>
                {!loginState && (
                    <input
                        placeholder="Full name(mandatory)"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                {!loginState && (
                    <input
                        placeholder="Profile image url(optional)"
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                )}
                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                {!loginState && (
                    <input
                        placeholder="Confirm password"
                        type="password"
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                )}
                <button onClick={loginOrSignup} type="submit">
                    {loginState ? "Sign In" : "Sign Up"}
                </button>
            </form>
            <p>
                {loginState ? "New user" : "Existing User"}?{" "}
                <span onClick={register} className="login_register">
                    {loginState ? "Register Now" : "Login"}
                </span>
            </p>
        </div>
    );
};

export default Login;
