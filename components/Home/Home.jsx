import { videoData } from "../../utility/data";
import {Link} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

    const[video, setVideo] = useState([])
    useEffect(()=>{
        async function getData(){
            const data = await fetch('http://localhost:3000/', {method: 'GET'});
            const finalDat = await data.json();
            setVideo(finalDat);
        }
        getData();
    },[])

    return(
        <div className="main-container">
            {video.videos?.map((data)=>
                <div className="filter-btns">
                    <button className="filter">{data.category}</button>
                </div>
            )}

            <div className="content-container">
                {video.videos?.map((data)=>
                <Link key={data._id} to={`/video/${data._id}`}>
                    <div className="content-box">
                    <img src={data.thumbnailUrl} alt="video-thumbnail" />
                    <div className="video-info">
                        <div className="channel-avatar">
                            <img src={data.thumbnailUrl} alt="" />
                        </div>
                        <div className="video-details">
                            <span className="vid-title">
                                {data.title}
                            </span>
                            <span className="channel-name sm-txt">
                                {data["uploader "]}
                            </span>
                            <span className="views-info sm-txt">
                                {data["views "]} views - {data.uploadDate} 
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