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
  const [state, setState] = useState(0);

  useEffect(() => {
    async function getData() {
      await axios.put(`http://localhost:3000/view/${id.id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      }).then((res) => {
        // console.log(res);
      }).catch((err) => {
        toast.error(err.response.data);
      })
    }
    getData();
  }, [id])

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/view/${id.id}`, {
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
        }
      }).then((res) => {
        setVideo(res.data.data);
        res.data.data.views -= 1;
        setAll(res.data)
        setComments(res.data.videoComments);
      }).catch((err) => {
        toast.error(err.response.data);
      })
    }
    getData();
  }, [state])

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
      setState((pre) => pre + 1);
    }).catch((err) => {
      toast.warn(err.response.data.msg);
    })

  }

  function editMenu() {
    const edit =document.querySelector(".opt-menu");
    edit.style.display = edit.style.display== 'block' ? 'none' : 'block' ;
  }

  const channelInfo = allvids.channels?.filter((d) => d.owner.includes(allvids.data.uploader))[0];
  const isSub = !channelInfo?.subscribers?.includes(allvids.luser ? allvids?.luser._id : null);

  async function subscribe() {
    const url = !isSub ?
      `http://localhost:3000/channel/unsubscribe/${channelInfo._id}` :
      `http://localhost:3000/channel/subscribe/${channelInfo._id}`;

    await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).then((res) => {
      setState(pre => pre + 1)
      toast(res.data.msg)
    })
      .catch((error) => {
        setState(pre => pre + 1)
        toast.info(error.response.data.msg);
      });
  }

  async function AddLike() {
    await axios.put(`http://localhost:3000/video/like/${id.id}`, null, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        "Name": 'Omkarg',
      }
    }).then((res) => {
      toast(res.data.msg)
      setState((pre) => pre + 1);
    }).catch((err) => {
      toast.error(err.response.data.msg)
    })
  }

  async function AddDisLike() {
    await axios.put(`http://localhost:3000/video/dislike/${id.id}`, null, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        "Name": 'Omkarg',
      }
    }).then((res) => {
      toast(res.data.msg)
      setState((pre) => pre + 1);
    }).catch((err) => {
      toast.error(err.response.data.msg)
    })
  }

  function handleEdit(){

  }
  function handleEdit(id){
    // useEffect(()=>{
    //   axios.delete(``)
    // },[])
    toast(id)
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
            <h1 className="video-title">{video?.title}</h1>
            <span className="reactions">
              <i onClick={AddLike} className="bi bi-hand-thumbs-up-fill">{video.likes}</i>
              <i onClick={AddDisLike} className="bi bi-hand-thumbs-down-fill">{video.dislikes}</i>
            </span>
            <div className="video-meta">
              <span className="views">{video?.viewedBy?.length} Views</span> • <span className="publish-date">{
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
                {!isSub ? "Subscribed " : "Subscribe "}<small>{channelInfo?.subs}</small>
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
                <input type="text" value={addCmt} name="newComment" id="comment" onChange={(e) => setNewcmt(e.target.value)} />
                <button className="cmt-btn" onClick={() => submitComment()}>Send</button>
                <br /> <br />
              </div>
              {/* </div> */}
              {comments.length == 0 ? <div className="comment">
                <span className="comment-author">
                  <h4>No comments yet</h4>
                </span>
              </div> :
                allvids.videoComments?.map((c) =>
                  <div key={c._id} className="comment">
                    <ul>
                      <li>{c.commentText}</li>
                      <li className="username">by: {c.username}</li>
                    </ul>
                    {c.by.includes(allvids.luser._id) ? 
                    <div>

                    <i className="bi bi-three-dots-vertical" onClick={editMenu}>
                    </i>

                    <div className="opt-menu">
                      <button onClick={handleEdit}>Edit</button>
                      <button onClick={()=>handleEdit(c._id)}>delete</button>
                    </div>
                    </div>
                    : ''}
                    

                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="suggestions">
          <h2>Suggested Videos</h2>
          {allvids.suggest?.map(vid =>
            <div key={vid._id} className="suggested-video-thumbnails">
              <div className="video-tile">
                <img src={vid.thumbnailUrl} alt="video thumbnail" />
                <br /><br />
                <p>{vid.title}</p>
                <p style={{ fontSize: '12px', color: 'grey' }}>{vid.viewedBy?.length}-Views</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;