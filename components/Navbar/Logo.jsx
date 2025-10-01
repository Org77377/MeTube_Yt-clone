import "../style.css";
import { useContext } from "react";
import { SidebarBtn } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

function Logo() {
  // to toggle sidebar button
  const { switchSidebtn } = useContext(SidebarBtn);

  return (
    <>
      {/* search bar and search button */}
      {/* Logo section */}
      <div id="logoNav">
        <li className="icon" onClick={() => switchSidebtn()}>
          <i className="bi bi-list"></i>
        </li>

        <Link to={"/"} replace={true}>
          <li className="logo">
            <img src="/main_logo.svg" alt="app_logo" />
            <small className="logo-txt">
              {" "}
              <b>MeTube</b>
            </small>
          </li>
        </Link>

      </div>
    </>
  );
}

export default Logo;
