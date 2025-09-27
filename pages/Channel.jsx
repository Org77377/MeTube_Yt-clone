import axios from "axios"
import "./pages.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

export function Channel() {

    const id = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios.get(`http://localhost:3000/channel/${id.id}`)
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                })
                .catch((err) => {
                    toast.error(err.response.data.msg);
                })
        }
        getData();
    }, [])
    console.log()



    return (
        <>
            <div className="channel-container">
                <div className="profile-side">
                    <img className="channelBanner" src={data.data?.channelBanner} alt="" />
                    <h1>{data.data?.channelName}</h1>
                    <li>Joined {data.data?.createdAt.split("T")[0]}</li>
                    <li>Description : {data.data?.description}</li>
                    <li>Subscribers : {data.data?.subs}</li>
                </div>
                <div className="video-side">
                    {data.vidData?.map((d) =>
                        <div className="video">
                            <Link key={data._id} to={`/video/${d._id}`}>
                            <img className="channel-thumb" src={d.thumbnailUrl} alt="video-thumbnail" />
                            <div className="ch-video-details">
                                <li className="ch-title">{d.title}</li>
                                <li>{d.views} views •&nbsp;
                                {
                                    Math.floor((Date.now() - new Date(d.uploadDate).getTime()) / (1000 * 60 * 60)) > 24
                                    ? `${Math.floor((Date.now() - new Date(d.uploadDate).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                                    : `${Math.floor((Date.now() - new Date(d.uploadDate).getTime()) / (1000 * 60 * 60))} hours ago`
                                }
                                </li>
                            </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}