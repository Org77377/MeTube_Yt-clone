import axios from "axios";
import "./pages.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../components/Home/Home";

function VideoUpload() {
    const [data, setData] = useState([]);
    const [channelname, setChannel] = useState("");
    const [description, setDesc] = useState("");
    const [banner, setBanner] = useState(null);
    const [imgUrl, setImg] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumb] = useState(null);
    const [title, setTitle] = useState("");
    const [vidDesc, setVidDesc] = useState("");
    const [category, setCategory] = useState("");
    const [videoUrl, setVidurl] = useState("");
    const [thumbUrl, setThumbUrl] = useState("");

    // create useEffect to fetch user data on component mount and check if channel is created or not
    // if not created, show create channel form else show upload video form
    // also show preview of banner image and video thumbnail
    useEffect(() => {
        async function userData() {
            await axios
                .get(`${apiUrl}/user/`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setData(res.data.data);
                    if (res.data.data.channel?.isCreated == false) {
                        toast.error("Please create a channel first");
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.msg);
                });
        }
        userData();
    }, []);
    // function to handle video file input and set video url for preview when file is selected
    function handleVideo(e) {
        setVidurl(URL.createObjectURL(e.target.files[0]));
        setVideo(e.target.files[0]);
    }
    // function to handle thumbnail file input and set thumbnail url for preview when file is selected
    function handleThumb(e) {
        setThumb(e.target.files[0]);
        setThumbUrl(URL.createObjectURL(e.target.files[0]));
    }
    // function to handle banner file input and set banner url for preview when file is selected
    function handleBanner(e) {
        setBanner(e.target.files[0]);
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    // function to create channel by sending form data to backend
    async function createChannel(e) {
        e.preventDefault();
        setLoader(true);
        const formdata = new FormData();
        formdata.append("channelname", channelname);
        formdata.append("description", description);
        formdata.append("banner", banner);
        // call backend api to create channel
        await axios
            .post(`${apiUrl}/channel/create`, formdata, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                // if channel is created successfully, show success message and navigate to dashboard
                // else show error message
            })
            .then((res) => {
                setLoader(false);
                toast.success(res.data.msg);
                navigate("/dashboard", { replace: "true" });
            })
            .catch((err) => {
                setLoader(false);
                toast.error(err.response.data.msg);
            });
    }

    // function to upload video by sending form data to backend
    async function uploadVideo(e) {
        e.preventDefault();
        setLoader(true);
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", vidDesc);
        formdata.append("category", category);
        formdata.append("thumbnail", thumbnail);
        formdata.append("video", video);
        // call backend api to upload video
        await axios
            .post(`${apiUrl}/video/upload`, formdata, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                // if video is uploaded successfully, show success message and reload the page
                // else show error message
            })
            .then((res) => {
                setLoader(false);
                toast.success(res.data.msg);
                window.location.reload();
            })
            .catch((err) => {
                setLoader(false);
                toast.error(err.response.data.msg);
            });
    }

    return (
        <>
            {/* main page  */}
            <div className="video-upload">
                {/* <h1>Hii</h1> */}
                {/* check if channel is created or not if not then show a form to create one */}
                {data.channel?.isCreated == false ? (
                    <div className="channel-create">
                        <div className="ch-form">
                            <form onSubmit={createChannel} className="signup-form">
                                <h2>Create Channel</h2>
                                <input
                                    type="text"
                                    pattern='^[a-zA-Z0-9_-]{3,50}$'
                                    title="Username must be between 3 and 50 characters and may only contain letters, numbers, underscores, and hyphens."
                                    onChange={(e) => setChannel(e.target.value)}
                                    placeholder="Channel Name"
                                    style={{ color: "white" }}
                                    required
                                />
                                <textarea
                                    style={{ color: "white" }}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="Description"
                                    minLength={10}
                                    maxLength={500}
                                    required
                                />
                                <input type="file" onChange={handleBanner} required />
                                <div className="preview-container">
                                    {imgUrl && (
                                        <img
                                            src={imgUrl}
                                            alt="channel-avatar"
                                            className="preview-image"
                                        />
                                    )}
                                </div>
                                <button>
                                    {/* show a loader when channel is being created by using loader state */}
                                    {
                                        loader && (
                                            <div className="loader">
                                                <div className="load"></div>
                                            </div>
                                        )
                                        // show "Creating..." text when channel is being created
                                    }
                                    {loader ? "Creating..." : "Create Channel"}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    // if channel is created then show a form to upload video
                    // along with preview of video and thumbnail
                    // and also show a loader when video is being uploaded by using loader state
                    // allow only video files for video input and image files for thumbnail input
                    // also set required attribute for all inputs
                    // patten attribute for channel name input to allow only certain characters
                    <div className="channel-create">
                        <div className="ch-form">
                            <form onSubmit={uploadVideo} className="signup-form">
                                <h3>Upload Video</h3> <hr />
                                <input
                                    type="text"
                                    pattern="^[a-zA-Z0-9 _\-\:!,.]{3,100}$"
                                    max={100}
                                    title="Title should be minimum of leength 10 charecters"
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Video title"
                                    required
                                />
                                <textarea
                                    onChange={(e) => setVidDesc(e.target.value)}
                                    placeholder="Description"
                                    minLength={10}
                                    maxLength={500}
                                    style={{ color: "white" }}
                                    required
                                />
                                <input
                                    type="text"
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Category e,g Travel"
                                    pattern="^[a-zA-Z0-9 _\-]{3,50}$"
                                    required
                                />
                                Video
                                <input
                                    type="file"
                                    onChange={handleVideo}
                                    required
                                    accept="video/*"
                                />
                                {video && (
                                    <video className="preview-video" src={videoUrl} autoPlay loop>
                                        {" "}
                                        <br />
                                    </video>
                                )}
                                <br />
                                Thumbnail
                                <input
                                    type="file"
                                    onChange={handleThumb}
                                    required
                                    accept="image/*"
                                />
                                {thumbUrl && (
                                    <img
                                        src={thumbUrl}
                                        alt="channel-avatar"
                                        className="th-preview-image"
                                    />
                                )}
                                <div className="preview-container"></div>
                                <button>
                                    {/* loader state */}
                                    {loader && (
                                        <div className="loader">
                                            <div className="load"></div>
                                        </div>
                                    )}
                                    {loader ? "Uploading..." : "Upload"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default VideoUpload;
