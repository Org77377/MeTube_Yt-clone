import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";
import SideMenuStatic from "./SideMenuStatic";
import { useContext, useEffect, useState } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import "../style.css";
import { toast } from "react-toastify";

function Navbar() {
    const { sidebtn } = useContext(SidebarBtn);
    const [session, setSession] = useState(sessionStorage.getItem("token"));

    function LogOut() {
        setTimeout(() => {
            setSession(sessionStorage.setItem("token", ""));
            toast.info("You are logged out", {
                hideProgressBar: true,
                position: "top-right",
            });
        }, 300);
    }

    return (
        <>
            <div className="navbar">
                <div className="l-side">
                    <Logo />
                </div>
                <div className="center">
                    <Search />
                </div>
                <div className="r-side">
                    {!session == "" ? (
                        <div className="logout-sm">
                                <Link to="/upload">
                                    <div className="upload">
                                        <i class="bi bi-camera-video"></i>
                                    </div>
                                </Link>
                                <i class="bi bi-person-circle"></i>
                                <button onClick={() => LogOut()} className="logout-btn">
                                    Logout
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
