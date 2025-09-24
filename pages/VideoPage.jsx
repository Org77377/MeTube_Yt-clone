import { useEffect, useState } from "react";
import "./pages.css";
import { useParams } from "react-router-dom";
import axios from "axios";


function VideoPage(){

    const id = useParams()
    const[video, setVideo] = useState([])
        useEffect(()=>{
            async function getData(){
                const data = await axios.put(`http://localhost:3000/video/like/${id}`);
                setVideo(data);
            }
            getData();
        },[])

    return(
        <>
        <div className="video-container">
            {console.log(video)}
        </div>
        </>
    )
}

export default VideoPage;