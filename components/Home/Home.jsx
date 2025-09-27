import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../pages/pages.css";


function Home() {

    // const [filterd, filterSwitch] = useState(false);
    const [filset, filSwitch] = useState('');
    const [video, setVideo] = useState([]);
    // const [loader, setLoader] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await axios.get('http://localhost:3000/')
                .then((res) => {
                    const finalDat = res.data;
                    setVideo(finalDat);
                })
                .catch((err) => {
                    toast.error(err.response.data.msg)
                });
            // const finalDat = await data;
            // setVideo(finalDat);
            // setVideo(finalDat);
            // const data = await fetch('http://localhost:3000/', {method: 'GET'})
            // const finalDat = await data.json();
        }
        getData();
    }, [])

    function setSwitch(data, state) {
        // filterSwitch(state);
        filSwitch(data)
    }
    const fildata = !filset == '' ? video.videos?.filter((data) => data.category?.includes(filset)) : video.videos;
    return (

        <div className="main-container">
            <div className="filter-btns">
                <button onClick={() => { filSwitch('') }} className="filter">All</button>
                {video.videos?.map((data) =>
                    <button key={data._id} onClick={() => { filSwitch(data.category) }} className="filter">{data.category}</button>
                )}
            </div>
            <div className="content-container">
                {fildata?.map((data) =>
                        <div className="content-box">
                            <Link key={data._id} to={`/video/${data._id}`}>
                            <div key={data._id} className="image-wrapper">
                                <img src={data.thumbnailUrl} alt="video-thumbnail" />
                            </div>
                            </Link>
                            <div className="video-info">
                                {video.chInfo.filter((d)=> d.owner.includes(data.uploader)).map(d => 
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
                                    <span className="views-info sm-txt">
                                        {data.views} views - {
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