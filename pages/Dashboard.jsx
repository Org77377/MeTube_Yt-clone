import axios from "axios";
import { useEffect, useState } from "react";
import "./pages.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const [user, setUser] = useState([]);
    const [channel, setChannel] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [subscribed, setSub] = useState([]);
    const [liked, setLiked] = useState([]);
    const [loader, setLoader] = useState(false);
    const [viewd, setViewd] = useState([]);
    const [state, setState] = useState(0);

    useEffect(() => {
        async function getData() {
            await axios.get('http://localhost:3000/user/', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
                .then((res) => {
                    setUser(res.data.data)
                    setSub(res.data.subd)
                    setLiked(res.data.liked)
                    setViewd(res.data.viewd)
                    setUploads(res.data.videos)
                    setChannel(res.data.channel)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getData();
    }, [state])


    async function delChannel(id) {
        setLoader(true)
        await axios.delete(`http://localhost:3000/channel/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then((res) => {
                setLoader(false)
                setState(pre => pre + 1)
                toast.success(res.data.msg)
                console.log(res)
            })
            .catch((err) => {
                setLoader(false)
                console.log(err)
            })
    }
    console.log(user, channel, uploads, subscribed)

    return (
        <>
            <div className="channel-container">
                <div className="profile-side">
                    <img className="channelBanner" src={user.logoUrl} alt="" />
                    <div className="user-info">

                        <h3>{user.name}</h3>
                        <h6>Username: {user.username}</h6>
                        <hr />
                        {!user.channel?.isCreated &&
                            <p>Channel Not Created</p>
                        }
                        {user.channel?.isCreated &&
                            <div className="channel-info">
                                <h4>Channel Information</h4>
                                <p>Channel Name: {channel[0].channelName}</p>
                                <p>Subscribers: {channel[0].subs}</p>
                                <p>Videos: {uploads?.length}</p>

                                <button className="ch-del" onClick={() => delChannel(channel[0]._id)}>
                                    {loader && <div className="loader">
                                        <div className="load"></div>
                                    </div>}{loader ? "Deleting" : "Delete Channel"}
                                </button>
                            </div>
                        }

                        <hr />

                        <div className="subscribed">
                            <h6>Subscribed Channels: {subscribed?.length}</h6>
                            <div className="sub-channels">
                                {subscribed?.map((c) =>
                                    <div key={c._id} className="sub-ic">
                                        <Link to={`/channel/${c._id}`}>
                                            <img className="sub-icon" src={c.channelBanner} alt="" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <hr />

                        <div className="liked-videos">
                            <h6>Liked Vides</h6>
                            {
                                liked.map((like) =>
                                    <div key={like._id} className="video-liked-cont">
                                        <img src={like.thumbnailUrl} alt="liked-video-thumbnail" />
                                        <li>{like.title}</li>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="ch-video-side">
                        <h1>Your videos</h1>
                        <div className="user-videos-box">
                        {uploads.map((data) =>
                            <div className="user-videos">
                                <Link to={`/dashboard/edit/${data._id}`}>
                                <img className="user-videos-img" src={data.thumbnailUrl} alt="" />
                                </Link>
                                <li>{data.title}</li>
                                <li>{data.viewedBy?.length} views - {data.likedBy?.length} likes</li>
                            </div>
                        )}
                        </div>

                        <hr style={{opacity: '0.8', borderBottom: '2px solid white'}}/>
                        <h2 style={{color: 'white'}}>Watch history</h2>
                        <div className="user-videos-box">
                        {viewd.map((data) =>
                            <div className="user-videos">
                                <Link to={`/dashboard/edit/${data._id}`}>
                                <img className="user-videos-img" src={data.thumbnailUrl} alt="" />
                                </Link>
                                <li>{data.title}</li>
                                <li>{data.viewedBy?.length} views - {data.likedBy?.length} likes</li>
                            </div>
                        )}
                        </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;