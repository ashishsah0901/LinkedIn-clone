import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Feed from "./components/feed/Feed";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Widgets from "./components/widgets/Widgets";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function App() {
    useEffect(() => {
      console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
      console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
    }, []);
    
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoURL: userAuth.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);
    return (
        <div className="app">
            <Header />
            {!user ? (
                <Login />
            ) : (
                <div className="app_body">
                    <Sidebar />
                    <Feed />
                    <Widgets />
                </div>
            )}
        </div>
    );
}

export default App;
