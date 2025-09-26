import { useEffect, useState } from "react";
import "./pages.css";
import { useParams } from "react-router-dom";
import axios from "axios";


function VideoPage(){

    const id = useParams();
    const[video, setVideo] = useState([]);
    const[comments, setComments] = useState([]);
    const[allvids, setAll] = useState([]);
    const[addCmt, setNewcmt] = useState([]);
    const[commentField, setCommentField] = useState('');

        useEffect(()=>{
            async function getData(){
                const data = await fetch(`http://localhost:3000/view/${id.id}`, {method: 'PUT'});
                const jsonData = await data.json();
                setVideo(jsonData.data);
                setAll(jsonData)
                setComments(jsonData.videoComments);
            }
            getData();
        },[])

      async function submitComment(){
            const addCmt = await fetch(`http://localhost:3000/comment/${id.id}`, {method: 'POST'});
            const cmtdata = await addCmt.json();
            setNewcmt(cmtdata);
        }

        if(addCmt.msg == "Invalid Credentials"){
          console.log("please login");
        }

    return (
    <div className="video-page-container">
      {/* {console.log(addCmt)} */}
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
            <div className="comment-list"><br />
            <h5>Add a comment</h5>
            <div className="comment-box">
                <input type="text" name="newComment" id="comment" onChange={(e)=>setCommentField(e.target.value)}/> 
                <button className="cmt-btn" onClick={()=>submitComment()}>Send</button>
                <br /> <br />
            </div>
              {comments.length==0 ? <div className="comment">
                <span className="comment-author">
                  <h4>No comments yet</h4>
                </span>
              </div> :
              comments?.map((c)=>
              <div className="comment">
                <span className="comment-author">{}</span>
                <p className="comment-text">{c.commentText}</p>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="suggestions">
          <h2>Suggested Videos</h2>
          {allvids.suggest?.map(vid=>
          <div className="suggested-video-thumbnails">
            <div className="video-tile">
              <img src={vid.thumbnailUrl} alt="video thumbnail"/>
              <br /><br />
              <p>{vid.title}</p>
              <p style={{fontSize: '12px', color: 'grey'}}>{vid.views}-Views</p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;