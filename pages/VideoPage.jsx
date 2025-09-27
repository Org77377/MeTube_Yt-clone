import { useEffect, useState } from "react";
import "./pages.css";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function VideoPage() {

  const id = useParams();
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const [allvids, setAll] = useState([]);
  const [addCmt, setNewcmt] = useState('');
  // const[editmenu, seteditMenu] = useState(false);
  // const[commentField, setCommentField] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await fetch(`http://localhost:3000/view/${id.id}`, { method: 'PUT' });
      const jsonData = await data.json();
      setVideo(jsonData.data);
      setAll(jsonData)
      setComments(jsonData.videoComments);
    }
    getData();
  }, [])

  const ctoken = sessionStorage.getItem('token')
  async function submitComment() {
    const formData = new FormData();
    formData.append('comment', addCmt);

    await axios.post(`http://localhost:3000/comment/${id.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${ctoken}`,
      }
    }).then((res) => {
      toast(res.data.msg)
      console.log(res.data);
    }).catch((err) => {
      toast.warn(err.response.data.msg);
    })
  }

  function editMenu() {
    toast("edit");
  }
  const channelInfo = allvids.channels?.filter((d) => d.owner.includes(allvids.data.uploader))[0];

  async function subscribe() {
    console.log(ctoken)
    await axios.put(`http://localhost:3000/channel/subscribe/${channelInfo?._id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': ctoken,
        'Authorization': `Bearer ${ctoken}`,
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
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
              <span className="views">{video.views} Views</span> • <span className="publish-date">{
                Math.floor((Date.now() - new Date(video.uploadDate).getTime()) / (1000 * 60 * 60)) > 24
                  ? `${Math.floor((Date.now() - new Date(video.uploadDate).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                  : `${Math.floor((Date.now() - new Date(video.uploadDate).getTime()) / (1000 * 60 * 60))} hours ago`
              } • by <b>{channelInfo?.channelName}</b></span>
            </div>
            <div className="profile-details">
              <div className="ch-preview">
                <img className="ch-preview-image" src={channelInfo?.channelBanner} alt="" />
              </div>
              <div className="sub-button" onClick={subscribe}>
                Subscribe <small>{channelInfo?.subs}</small>
              </div>
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
                <input type="text" name="newComment" id="comment" onChange={(e) => setNewcmt(e.target.value)} />
                <button className="cmt-btn" onClick={() => submitComment()}>Send</button>
                <br /> <br />
              </div>
              {/* </div> */}
              {comments.length == 0 ? <div className="comment">
                <span className="comment-author">
                  <h4>No comments yet</h4>
                </span>
              </div> :
                comments?.map((c) =>
                  <div className="comment">
                    <p className="comment-text">{c.commentText}</p>
                    <i class="bi bi-three-dots-vertical" onClick={editMenu}></i>

                    {/* <span className="setEdit">
                  <span>Edit</span>
                  <span>Delete</span>
                </span> */}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="suggestions">
          <h2>Suggested Videos</h2>
          {allvids.suggest?.map(vid =>
            <div className="suggested-video-thumbnails">
              <div className="video-tile">
                <img src={vid.thumbnailUrl} alt="video thumbnail" />
                <br /><br />
                <p>{vid.title}</p>
                <p style={{ fontSize: '12px', color: 'grey' }}>{vid.views}-Views</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;