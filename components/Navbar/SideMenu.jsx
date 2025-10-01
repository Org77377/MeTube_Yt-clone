import "../style.css";
import { SidebarBtn } from "../../context/SidebarContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function SideMenu() {
  const { user } = useContext(SidebarBtn);

  return (
    <>
      <div className={`side-menu`}>
        <div className={`side-container`}>
          <Link to="/">
            <div className={`content`}>
              <i className="bi bi-house-fill"></i>
              <li>Home</li>
            </div>
          </Link>
          {user?.data ? (
            <>
              <div className={`content`}>
                <i className="bi bi-patch-check-fill"></i>
                <li>Hi {user.data?.name}</li>
              </div>
              {user?.data?.channel.isCreated ? (
                <Link to="/upload" replace={true}>
                  <div className={`content`}>
                    <i className="bi bi-fast-forward-btn-fill"></i>
                    <li>Upload</li>
                  </div>
                </Link>
              ) : (
                <Link to="/upload" replace={true}>
                  <div className={`content`}>
                    <i className="bi bi-cloud-plus-fill"></i>
                    <li>Create Channel</li>
                  </div>
                </Link>
              )}
              <hr />
              <Link to="/dashboard" replace={true}>
                <div className={`content`}>
                  <img
                    src={user.data?.logoUrl}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      border: "2px solid red",
                      borderRadius: "50%",
                      aspectRatio: "1/1",
                    }}
                  />
                  <li>You</li>
                </div>
              </Link>
              <hr />
              <Link to="/dashboard" replace={true}>
                <div className={`content`}>
                  <i className="bi bi-clock-history"></i>
                  <li>History</li>
                </div>
              </Link>
              {user.subd?.length > 0 ? (
                <div>
                  <hr />
                  <div className={`content`}>
                    <li>Your Subscriptions</li>
                  </div>
                  {/* <hr/> */}
                  {user.subd.map((d) => (
                    <Link to={`/channel/${d._id}`} replace={true} key={d._id}>
                      <div className={`content`}>
                        <img
                          src={d.channelBanner}
                          alt=""
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            border: "2px solid red",
                            borderRadius: "50%",
                            aspectRatio: "1/1",
                          }}
                        />
                        <li>{d.channelName}</li>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                " "
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <div className={`content`}>
                  <i className="bi bi-box-arrow-in-left"></i>
                  <li>Login In</li>
                </div>
              </Link>

              <Link to="/signup">
                <div className={`content`}>
                  <i className="bi bi-person-plus-fill"></i>
                  <li>Sign up</li>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
