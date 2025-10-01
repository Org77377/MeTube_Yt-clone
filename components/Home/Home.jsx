import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "../../pages/pages.css";
import { SidebarBtn } from "../../context/SidebarContext";

function Home() {

    const [filset, filSwitch] = useState('');
    const [video, setVideo] = useState([]);
    const { text } = useContext(SidebarBtn);
    const [mainLoad, setLoad] = useState(true);

    //get video data when page is loaded 
    useEffect(() => {
        setLoad(true)
        async function getData() {
            await axios.get('http://localhost:3000/')
                .then((res) => {
                    setLoad(false)
                    setVideo(res.data);
                })
                .catch((err) => {
                    setLoad(true)
                    setTimeout(() => {
                        toast.warning("seems like you are offline")
                    }, 1000)
                    toast.error(err.response.data.msg)
                });
        }
        getData();
    }, [])

    // filter videos from search text
    const searchData = video.videos?.filter((v) => v.title.toLowerCase().includes(text.toLowerCase()));
    // default set videos to display all videos
    let fildata = video?.videos;
    // video filter by catergories
    if (!filset == '') {
        fildata = video.videos?.filter((data) => data?.category == (filset));
    } else {
        if (text != '') {
            fildata = searchData;
        }
    }

    return (
        <div className="main-container">
            {/* dummy overlays for loading screen */}
            {mainLoad &&
                <div className="loader-main">
                    <div className="load-items">
                    </div>
                    <div className="load-items">
                    </div>
                    <div className="load-items">
                    </div>
                    <div className="load-items">
                    </div>
                    <div className="load-items">
                    </div>
                    <div className="load-items">
                    </div>
                </div>}

            {/* filter videos based on category */}
            <div className="filter-btns">
                {video?.videos ? <button onClick={() => { filSwitch('') }} className="filter">All</button> : ''}
                {[...new Set(video.videos?.map(data => data.category))].map((category) =>
                    <button key={category} onClick={() => { filSwitch(category) }} className="filter">
                        {category}
                    </button>
                )}

            </div>
            <div className="content-container">
                {/* logic to get all videos */}
                {fildata?.map((data) =>
                    <div key={data._id} className="content-box">
                        <Link key={data._id} to={`/video/${data._id}`}>
                            <div key={data._id} className="image-wrapper">
                                <img src={data.thumbnailUrl} alt="video-thumbnail" />
                            </div>
                        </Link>
                        {/* video card */}
                        <div className="video-info">
                            {video.chInfo?.filter((d) => d.owner.includes(data.uploader)).map(d =>
                                <Link key={d._id} to={`/channel/${d._id}`}>
                                    <div className="channel-avatar">
                                        <img src={video.chInfo?.filter(d => d.owner.includes(data.uploader)).map(d => d.channelBanner)} alt="" />
                                    </div>
                                </Link>
                            )}

                            <div className="video-details">
                                <span className="vid-title">
                                    {data.title}
                                </span>
                                <span className="channel-name sm-txt">
                                    {video.uploader?.filter(d => d._id.includes(data.uploader)).map(d => d.channel.channelName)}
                                </span>
                                {/* to display video upload date and time */}
                                <span className="views-info sm-txt">
                                    {data.viewedBy?.length} views - {
                                        Math.floor((Date.now() - new Date(data.uploadDate).getTime()) / (1000 * 60 * 60)) > 24
                                            ? `${Math.floor((Date.now() - new Date(data.uploadDate).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                                            : `${Math.floor((Date.now() - new Date(data.uploadDate).getTime()) / (1000 * 60 * 60))} hours ago`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;