import { useEffect, useState } from "react";
import "./pages.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VideoPage() {
  const formData = new FormData();
  const id = useParams();
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const [allvids, setAll] = useState([]);
  const [addCmt, setNewcmt] = useState("");
  const [state, setState] = useState(0);
  const [currUser, setCurr] = useState([]);

  // get video data from backend using id from params and set it to state
  // view register only for logged id's to track views
  // const tok = sessionStorage.getItem('token')
  useEffect(() => {
    async function getData() {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          // Token exists and is not null or empty
          const res = await axios.put(
            `http://localhost:3000/view/${id.id}`,
            null,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setCurr(res.data.user);
          // console.log(res)
        }
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.msg);
        } else {
          console.error(err); // Handle network errors or other issues
        }
      }
    }

    getData();
  }, [state]);

  // fetch video data and comments from backend using id from params and set it to state
  useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:3000/view/${id.id}`, {
          // send token in header to verify user
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setVideo(res.data.data);
          res.data.data.views -= 1;
          setAll(res.data);
          setComments(res.data.videoComments);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    }
    getData();
  }, [state]);

  const ctoken = sessionStorage.getItem("token");
  // function to submit comment to backend
  async function submitComment() {
    const formData = new FormData();
    formData.append("comment", addCmt);
    // send post request to backend to add comment
    await axios
      .post(`http://localhost:3000/comment/${id.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ctoken}`,
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
        // empty comment field when new comment added
        setNewcmt(" ");
        setState((pre) => pre + 1);
      })
      .catch((err) => {
        toast.warn(err.response.data.msg);
      });
  }
  const channelInfo = allvids.channels?.filter((d) =>
    d.owner.includes(allvids.data.uploader)
  )[0];
  const isSub = !channelInfo?.subscribers?.includes(
    currUser ? currUser?._id : null
  );
  // function to subscribe or unsubscribe to channel based on isSub state
  async function subscribe() {
    const url = !isSub
      ? `http://localhost:3000/channel/unsubscribe/${channelInfo._id}`
      : `http://localhost:3000/channel/subscribe/${channelInfo._id}`;

    await axios
      .put(url, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setState((pre) => pre + 1);
        toast(res.data.msg);
        window.location.reload();
      })
      .catch((error) => {
        setState((pre) => pre + 1);
        toast.info(error.response.data.msg);
      });
  }

  // function to add like to video and update state to re-render component
  async function AddLike() {
    await axios
      .put(`http://localhost:3000/video/like/${id.id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          Name: "Omkarg",
        },
      })
      .then((res) => {
        toast(res.data.msg);
        setState((pre) => pre + 1);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  }

  // function to add dislike to video and update state
  //  to re-render component similarly as AddLike function
  async function AddDisLike() {
    await axios
      .put(`http://localhost:3000/video/dislike/${id.id}`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          Name: "Omkarg",
        },
      })
      .then((res) => {
        toast(res.data.msg);
        setState((pre) => pre + 1);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  }

  // function to delete comment by id and update state and re-render component
  async function handleDelete(id) {
    await axios
      .delete(`http://localhost:3000/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
        setState((pre) => pre + 1);
      })
      .catch((err) => {
        setState((pre) => pre + 1);
        toast.error(err.response.data.msg);
      });
  }

  // function to edit comment by id and update state and re-render component
  async function handleEdit(id) {
    const newCmt = prompt("Enter a new comment");
    formData.append("comment", newCmt);
    await axios
      .put(`http://localhost:3000/comment/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
        setState((pre) => pre + 1);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  }

  return (
    // main container for video page with video player, video description,
    // comments section and suggested videos section
    <div className="video-page-container">
      {/* {console.log(addCmt)} */}
      <div className="video-content">
        {/* Main video section */}
        <div className="video-player">
          <div className="video">
            <iframe
              src={video?.videoUrl}
              allow="autoplay;"
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
          {/* Video description */}
          <div className="video-description">
            <h1 className="video-title">{video?.title}</h1>
            <div className="video-meta">
              <span className="views">{video?.viewedBy?.length} Views</span> •{" "}
              <span className="publish-date">
                {Math.floor(
                  (Date.now() - new Date(video?.uploadDate).getTime()) /
                  (1000 * 60 * 60)
                ) > 24
                  ? `${Math.floor(
                    (Date.now() - new Date(video?.uploadDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                  )} days ago`
                  : `${Math.floor(
                    (Date.now() - new Date(video?.uploadDate).getTime()) /
                    (1000 * 60 * 60)
                  )} hours ago`}{" "}
                • by <b>{channelInfo?.channelName}</b>
              </span>
            </div>
            &nbsp;
            <span className="reactions">
              {/* like dislike buttons */}
              <i onClick={AddLike} className="bi bi-hand-thumbs-up-fill">
                {video?.likes}
              </i>
              <i onClick={AddDisLike} className="bi bi-hand-thumbs-down-fill">
                {video?.dislikes}
              </i>
            </span>
            <hr />
            {/* show video details */}
            {/* show subscribe button and user avatar */}
            <div className="profile-details">
              <div className="ch-preview">
                <img
                  className="ch-preview-image"
                  src={channelInfo?.channelBanner}
                  alt=""
                />
              </div>
              <div
                className="sub-button"
                style={{ cursor: "pointer" }}
                onClick={subscribe}
              >
                <small>
                  {!isSub ? (
                    <small>Subscribed </small>
                  ) : (
                    <small>Subscribe </small>
                  )}
                  {channelInfo?.subs}
                </small>
              </div>
            </div>
            {/* show video description */}
            <div className="description-text">
              <p>{video?.description}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="video-comments">
            <h2>Comments</h2>
            <div className="comment-list">
              <br />
              <h5>Add a comment</h5>
              {/* <div className="comment-box"> */}
              {/* comment add section with edit option to intended user */}
              <div className="comment-box">
                <input
                  type="text"
                  value={addCmt}
                  name="newComment"
                  id="comment"
                  onChange={(e) => setNewcmt(e.target.value)}
                  required
                />
                <button className="cmt-btn" onClick={() => submitComment()}>
                  Send
                </button>
                <br /> <br />
              </div>
              {/* </div> */}
              {comments.length == 0 ? (
                <div className="comment">
                  {/* show no comments when there are no comments */}
                  <span className="comment-author">
                    <h4>No comments yet</h4>
                  </span>
                </div>
              ) : (
                allvids.videoComments?.map((c) => (
                  <div key={c._id} className="comment">
                    <ul>
                      <div>
                        <li>{c.commentText}</li>
                        <li className="username">by: {c.username}</li>
                      </div>
                      {c.by.includes(currUser?._id) ? (
                        <div className="btns">
                          <i
                            className="bi bi-pen"
                            onClick={() => handleEdit(c._id)}
                          ></i>
                          <i
                            className="bi bi-trash"
                            onClick={() => handleDelete(c._id)}
                          ></i>
                        </div>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="suggestions">
          <h2>Suggested Videos</h2>
          {allvids.suggest?.map((vid) => (
            <Link to={`/video/${vid._id}`} target="_self" replace={true} onClick={() => setState((pre) => pre + 1)}>
              <div style={{ color: 'black' }} key={vid._id} className="suggested-video-thumbnails">
                <div className="video-tile">
                  <img src={vid.thumbnailUrl} alt="video thumbnail" />
                  <br />
                  <br />
                  <p>{vid.title}</p>
                  <p style={{ fontSize: "12px", color: "grey" }}>
                    {vid.viewedBy?.length}-Views
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
