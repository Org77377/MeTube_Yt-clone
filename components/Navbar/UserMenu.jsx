import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="user-menu">
        <div className="user-avatar">
          <Link to="/login" replace="true">
            <i className="bi bi-person-circle"></i>
            <span className="user-signin">Sign In</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
