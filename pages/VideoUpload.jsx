import axios from "axios";
import './pages.css'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { replace, useNavigate } from "react-router-dom";

function VideoUpload() {

    const [data, setData] = useState([])
    const [channelname, setChannel] = useState('')
    const [description, setDesc] = useState('')
    const [banner, setBanner] = useState(null)
    const [imgUrl, setImg] = useState('')
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    // video upload 
    const [video, setVideo] = useState(null)
    const [thumbnail, setThumb] = useState(null)
    const [title, setTitle] = useState('')
    const [vidDesc, setVidDesc] = useState('')
    const [category, setCategory] = useState('')
    const [videoUrl, setVidurl] = useState('')
    const [thumbUrl, setThumbUrl] = useState('')
    
    useEffect(() => {
        async function userData() {
            await axios.get("http://localhost:3000/user/", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })
                .then((res) => {
                    setData(res.data.data);
                    if (res.data.data.channel?.isCreated == false) {
                        toast.error("Please create a channel first");
                    }
                }).catch((err) => {
                    toast.error(err.response.data.msg)
                })
        }
        userData();
    }, [])

    function handleVideo(e){
        setVidurl(URL.createObjectURL(e.target.files[0]))
        setVideo(e.target.files[0])
    }

    function handleThumb(e){
        setThumb(e.target.files[0])
        setThumbUrl(URL.createObjectURL(e.target.files[0]))
    }

    function handleBanner(e) {
        setBanner(e.target.files[0]);
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    async function createChannel(e) {
        e.preventDefault();
        setLoader(true)
        const formdata = new FormData();
        formdata.append("channelname", channelname);
        formdata.append("description", description);
        formdata.append("banner", banner);

        await axios.post("http://localhost:3000/channel/create", formdata, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then((res) => {
            setLoader(false)
            // console.log(res)
            toast.success(res.data.msg)
            navigate('/dashboard', {replace:'true'});
        }).catch((err) => {
            setLoader(false)
            toast.error(err.response.data.msg)
        })
    }


     async function uploadVideo(e) {
        e.preventDefault();
        setLoader(true)
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", vidDesc);
        formdata.append("category", category);
        formdata.append("thumbnail", thumbnail);
        formdata.append("video", video)

        await axios.post("http://localhost:3000/video/upload", formdata, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then((res) => {
            setLoader(false)
            toast.success(res.data.msg)
            console.log(res)
        }).catch((err) => {
            setLoader(false)
            toast.error(err.response.data.msg)
            console.log(err)
        })
    }


    return (
        <>
            <div className="video-upload">
                {/* {console.log(data)} */}
                {/* <h1>Hii</h1> */}
                {data.channel?.isCreated == false ?
                    <div className="channel-create">
                        <div className="ch-form">
                            <form onSubmit={createChannel} className="signup-form">
                            <h2>Create Channel</h2>
                                <input type="text" onChange={(e) => setChannel(e.target.value)} placeholder="Channel Name" pattern={"^[A-Za-z0-9 #_.-]{3,50}$"} title="Channel name must be 3–50 characters long and can include letters, numbers, spaces, and _ . -" required />
                                <textarea onChange={(e) => setDesc(e.target.value)} placeholder="Description" minLength={10} maxLength={500} required />
                                <input type="file" onChange={handleBanner} required />
                                <div className="preview-container">
                                    {imgUrl && <img src={imgUrl} alt="channel-avatar" className="preview-image" />}
                                </div>
                                <button>
                                    {loader &&
                                        <div className="loader">
                                            <div className="load">
                                            </div>
                                        </div>
                                    }{loader ? "Creating..." : "Create Channel"}</button>
                            </form>
                        </div>
                    </div>

                    : 
                    <div className="channel-create">
                        <div className="ch-form">
                            <form onSubmit={uploadVideo} className="signup-form">
                            <h3>Upload Video</h3> <hr />
                                <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Video title" required />
                                <textarea onChange={(e) => setVidDesc(e.target.value)} placeholder="Description" minLength={10} maxLength={500} required />
                                <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Category e,g Travel" required />
                                Video<input type="file" onChange={handleVideo} required accept="video/*"/>
                                    {video && <video className="preview-video" src={videoUrl} autoPlay loop> <br /></video> }
                                <br />
                                Thumbnail
                                <input type="file" onChange={handleThumb} required accept="image/*"/>
                                    {thumbUrl && <img src={thumbUrl} alt="channel-avatar" className="th-preview-image" />}
                                <div className="preview-container">
                                </div>
                                <button>
                                    {loader &&
                                        <div className="loader">
                                            <div className="load">
                                            </div>
                                        </div>
                                    }{loader ? "Uploading..." : "Upload"}</button>
                            </form>
                        </div>
                    </div>
                    }
            </div>
        </>
    )
}

export default VideoUpload;