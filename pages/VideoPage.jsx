import { useEffect, useState } from "react";
import "./pages.css";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function VideoPage(){

    const id = useParams();
    const[video, setVideo] = useState([]);
    const[comments, setComments] = useState([]);
    const[allvids, setAll] = useState([]);
    const[addCmt, setNewcmt] = useState('');
    // const[commentField, setCommentField] = useState('');

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

      const ctoken = sessionStorage.getItem('token')
      async function submitComment(){
            const formData = new FormData();
            formData.append('comment', addCmt);

            await axios.post(`http://localhost:3000/comment/${id.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${ctoken}`,
              }
          }).then((res)=>{
            toast(res.data.msg)
            console.log(res.data);
          }).catch((err)=>{
            toast(err.response.data.msg)
            console.log(err)
          })
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
            {/* <div className="comment-box"> */}
              <div className="comment-box">
                <input type="text" name="newComment" id="comment" onChange={(e)=>setNewcmt(e.target.value)}/> 
                <button className="cmt-btn" onClick={()=>submitComment()}>Send</button>
                <br /> <br />
              </div>
            {/* </div> */}
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