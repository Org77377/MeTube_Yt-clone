import { videoData } from "../../utility/data";
import {Link} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

    const[filterd, filterSwitch] = useState(false);
    const[filset, filSwitch] = useState('');
    const[video, setVideo] = useState([])

    useEffect(()=>{
        async function getData(){
            const data = await fetch('http://localhost:3000/', {method: 'GET'});
            const finalDat = await data.json();
            setVideo(finalDat);
        }
        getData();
    },[])

    function setSwitch(data, state){
        filterSwitch(state);
        filSwitch(data)
    }

    const fildata = filterd ? video.videos.filter(data=>data.category.includes(filset)) : video.videos;

    return(

        <div className="main-container">
            <div className="filter-btns">
            {video.videos?.map((data)=>
                    <button key={data._id} onClick={()=>setSwitch(data.category, !filterd)} className="filter">{data.category}</button>
                )}
            </div>

            <div className="content-container">
                {fildata?.map((data)=>
                <Link key={data._id} to={`/video/${data._id}`}>
                    <div className="content-box">
                    <div className="image-wrapper">
                    <img src={data.thumbnailUrl} alt="video-thumbnail" />
                    </div>
                    <div className="video-info">
                        <div className="channel-avatar">
                            <img src={video.chInfo?.filter(d=>d.owner.includes(data.uploader)).map(d=>d.channelBanner)} alt="" />
                        </div>
                        <div className="video-details">
                            <span className="vid-title">
                                {data.title}
                            </span>
                            <span className="channel-name sm-txt">
                                {video.uploader?.filter(d=>d._id.includes(data.uploader)).map(d=>d.channel.channelName)}
                            </span>
                            <span className="views-info sm-txt">
                                {data.views} views - {data.uploadDate} 
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
                )}
            </div>
        </div>
    );
}

export default Home;