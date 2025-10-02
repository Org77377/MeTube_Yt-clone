import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
import SideMenuStatic from "./SideMenuStatic";
import { useContext, useEffect, useState } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { toast } from "react-toastify";

function Navbar() {
    // main uppper navigation bar with logo search and profile
    const { sidebtn } = useContext(SidebarBtn);
    const [session, setSession] = useState(sessionStorage.getItem("token"));
    const navigate = useNavigate();

    // logout when user signs in clears token from session storage
    function LogOut() {
        setTimeout(() => {
            setSession(sessionStorage.setItem("token", ""));
            toast.info("You are logged out", {
                hideProgressBar: true,
                position: "top-right",
            });
            window.location.reload();
        }, 300);
        navigate("/", { replace: true });
    }

    return (
        <>
            <div className="navbar">
                {/* logo and text */}
                <div className="l-side">
                    <Logo />
                </div>
                {/* search bar and button */}
                <div className="center">
                    <Search />
                </div>
                {/* user profile and sign in button */}
                <div className="r-side">
                    {!session == "" ? (
                        <div className="logout-sm">
                            <Link to="/upload">
                                <div className="upload">
                                    <i className="bi bi-camera-video"></i>
                                </div>
                            </Link>
                            <Link to="/dashboard">
                                <i className="bi bi-person-circle"></i>
                            </Link>
                            <button onClick={() => LogOut()} className="logout-btn">
                                <span>Logout</span>
                                <i className="bi bi-box-arrow-right"></i>
                            </button>
                        </div>
                    ) : (
                        <UserMenu />
                    )}
                </div>
            </div>
            <SideMenuStatic />
            {sidebtn ? <SideMenu /> : ""}
        </>
    );
}

export default Navbar;
