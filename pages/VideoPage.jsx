import { useEffect, useState } from "react";
import "./pages.css";
import { useParams } from "react-router-dom";
import axios from "axios";


function VideoPage(){

    const id = useParams()
    const[video, setVideo] = useState([])

        useEffect(()=>{
            async function getData(){
                const data = await fetch(`http://localhost:3000/view/${id.id}`, {method: 'PUT'});
                const jsonData = await data.json();
                setVideo(jsonData.data);
            }
            getData();
        },[])

    return (
    <div className="video-page-container">
      <div className="video-content">
        {/* Main video section */}
        <div className="video-player">
          <div className="video">
            <iframe
              src={video.videoUrl} 
              allow="autoplay;" 
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>

          {/* Video description */}
          <div className="video-description">
            <h1 className="video-title">{video.title}</h1>
            <div className="video-meta">
              <span className="views">{video.views} Views</span> • <span className="publish-date">2 days ago</span>
            </div>
            <div className="description-text">
              <p>
                {video.description}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="video-comments">
            <h2>Comments</h2>
            <div className="comment-list">
              {/* Comments dynamically render here */}
              <div className="comment">
                <span className="comment-author">John Doe</span>
                <p className="comment-text">Great video! Learned a lot from this.</p>
              </div>
              {/* More comments */}
            </div>
          </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="suggestions">
          <h2>Suggested Videos</h2>
          <div className="suggested-video-thumbnails">
            {/* You would dynamically load video tiles here */}
            <div className="video-tile">
              <img src="thumbnail_url.jpg" alt="video thumbnail" />
              <p>Suggested Video Title</p>
            </div>
            {/* More video tiles */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;