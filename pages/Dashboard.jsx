import axios from "axios";
import { useEffect, useState } from "react";
import "./pages.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const [user, setUser] = useState([]);
    const [channel, setChannel] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [subscribed, setSub] = useState([]);
    const [liked, setLiked] = useState([]);
    const [loader, setLoader] = useState(false);
    const [vidloader, setVLoader] = useState(false);
    const [viewd, setViewd] = useState([]);
    const [state, setState] = useState(0);
    const [proSwitch, setSwitch] = useState(true);

    // get user data from backend and set it to state
    // also get channel info, uploads, subscribed channels, liked videos and watch history
    // using useEffect to fetch data on component mount and when state changes
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:3000/user/", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setUser(res.data.data);
                    setSub(res.data.subd);
                    setLiked(res.data.liked);
                    setViewd(res.data.viewd);
                    setUploads(res.data.videos);
                    setChannel(res.data.channel);
                })
                .catch((err) => {
                    toast.error(err);
                    console.log(err)
                });
        }
        getData();
    }, [state]);

    // function to delete channel by sending delete request to backend
    async function delChannel(id) {
        setLoader(true);
        await axios
            .delete(`http://localhost:3000/channel/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setLoader(false);
                setState((pre) => pre + 1);
                toast.success(res.data.msg);
            })
            .catch((err) => {
                toast.error(err.response.data.msg);
                console.log(err);
                setLoader(false);
            });
    }
    // function to delete video by sending delete request to backend
    async function handleDelete(data) {
        setVLoader(true);
        await axios
            .delete(`http://localhost:3000/video/${data}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                toast.success(res.data.msg);
                setState((pre) => pre + 1);
                setVLoader(false);
            })
            .catch((err) => {
                toast.error(err.response.data.msg);
                setVLoader(false);
            });
    }

    return (
        <>
            {/* channel container includes all user details */}
            <div className="channel-container">

                {proSwitch ?
                    <div className="profile-side">
                        <img className="channelBanner" src={user?.logoUrl} alt="" />
                        <div className="user-info">
                            {/* user information */}
                            <h3>Hii {user.name}</h3>
                            <h6>Username: {user.username}</h6>
                            <h6>Email: {user.email}</h6>
                            <button className="ch-del" style={{ fontWeight: '600', backgroundColor: 'rgba(163, 170, 244, 0.53)', color: 'rgba(8, 28, 248, 1)' }} onClick={() => setSwitch(!proSwitch)}>Switch to channel <i className="bi bi-toggle-on"></i></button>
                            <hr />

                            <div className="channel-info">
                                {/* show subscribed channels if any */}
                                <div className="subscribed">
                                    <h6>Subscribed Channels: {subscribed?.length}</h6>
                                    <div className="sub-channels">
                                        {subscribed?.map((c) => (
                                            <div key={c._id} className="sub-ic">
                                                <Link to={`/channel/${c._id}`}>
                                                    <img className="sub-icon" src={c.channelBanner} alt="" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <hr />
                                {/* show liked videos if any */}
                                <div className="liked-videos">
                                    <h6>Liked Videos: {liked?.length}</h6>
                                    {liked.map((like) => (
                                        <div key={like._id} className="video-liked-cont">
                                            <Link to={`/video/${like._id}`}>
                                                <img src={like.thumbnailUrl} alt="liked-video-thumbnail" />
                                            </Link>
                                            <li>{like.title}</li>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                <br />
                            </div>

                            <hr />

                        </div>
                    </div>

                    :

                    <div className="profile-side">
                        <img className="channelBanner" src={channel[0]?.channelBanner} alt="" />
                        <div className="user-info">
                            <p>Your Channel</p>
                            {/* user information */}
                            <h3>{channel[0]?.channelName}</h3>
                            <h6>Subscribers {channel[0]?.subs}</h6>
                            <h6>Videos: {uploads?.length}</h6>
                            <button className="ch-del" style={{ fontWeight: '600', backgroundColor: 'rgba(20, 37, 220, 1)' }} onClick={() => setSwitch(!proSwitch)}>Switch to user <i className="bi bi-toggle-off"></i></button>

                            <hr />

                            {/* show user channel information if created */}
                            {!user.channel?.isCreated &&
                                <>
                                    <p>Channel Not Created</p>
                                    Please create one <br />
                                    <Link to="/upload">
                                    <button className="ch-del" href="/upload">Create</button>
                                    </Link>
                                </>
                            }
                            {user.channel?.isCreated && (
                                <div className="channel-info">
                                    <h2>Description:</h2>
                                    <h6 style={{ textAlign: "left" }}> {channel[0]?.description}</h6>
                                    <hr />
                                    {/* button to delete channel */}
                                    <button
                                        className="ch-del"
                                        onClick={() => delChannel(channel[0]._id)}
                                    >
                                        {loader && (
                                            <div className="loader">
                                                <div className="load"></div>
                                            </div>
                                        )}
                                        {loader ? "Deleting" : "Delete Channel"}
                                    </button>
                                    <hr />
                                </div>
                            )}
                        </div>
                    </div>
                }



                {proSwitch ?
                    // user switch to show user details and user viewed history
                    <div className="ch-video-side">
                        {/* <button className="del-btn" onClick={clearHistory}></button> */}
                        <h1>Watch History</h1>
                        {/* watch history */}
                        <hr style={{ opacity: "0.8", borderBottom: "2px solid white" }} />
                        <div className="user-videos-box">
                            {viewd.map((data) => (
                                <div key={data._id} className="user-videos">
                                    <Link to={`/video/${data._id}`}>
                                        <img
                                            className="user-videos-img"
                                            src={data.thumbnailUrl}
                                            alt=""
                                        />
                                    </Link>
                                    <li>{data.title}</li>
                                    <li>
                                        {data.viewedBy?.length} views - {data.likedBy?.length} likes
                                    </li>
                                </div>
                            ))}
                        </div>
                    </div>

                    :
                    // channel switch shows list of videos uploaded by user
                    <div className="ch-video-side">
                        {/* show user uploaded videos */}
                        <h1>Your videos</h1>
                        { !uploads?.length <=0 ? (
                            <li style={{ color: 'rgba(229, 229, 229, 0.94)' }}>Click on video thumbnail to edit video details</li>
                        ) : (
                            <p style={{ color: 'white' }}>No uploads yet</p>
                        )}
                        <div className="user-videos-box">
                            {/* user videos */}
                            {uploads.map((data) => (
                                <div key={data._id} className="user-videos">
                                    <Link to={`/dashboard/edit/${data._id}`}>
                                        <img
                                            className="user-videos-img"
                                            src={data.thumbnailUrl}
                                            alt=""
                                        />
                                    </Link>
                                    <li>{data.title}</li>
                                    <li>
                                        {data.viewedBy?.length} views - {data.likedBy?.length} likes
                                    </li>
                                    <i
                                        className="bi bi-trash del-video"
                                        onClick={() => handleDelete(data._id)}
                                    >
                                        {vidloader && (
                                            <div className="loader">
                                                <div className="load"></div>
                                            </div>
                                        )}
                                    </i>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Dashboard;
