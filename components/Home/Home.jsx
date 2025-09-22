import { videoData } from "../../utility/data";
import {Link} from "react-router-dom";

function Home() {
    return(
        <div className="main-container">
            <div className="filter-btns">
                <button className="filter">Technology</button>
                <button className="filter">Sci-fi</button>
                <button className="filter">Travel</button>
                <button className="filter">Entertainment</button>
                <button className="filter">Entertainment</button>
                <button className="filter">Entertainment</button>
                <button className="filter">Entertainment</button>
            </div>

            <div className="content-container">
                {videoData.map(data=>
                <Link to={`/video/${data.videoId}`}>
                    <div className="content-box">
                    <img src={data.thumbnailUrl} alt="video-thumbnail" />
                    <div className="video-info">
                        <div className="channel-avatar">
                            <img src="" alt="" />
                        </div>
                        <div className="video-details">
                            <span className="vid-title">
                                {data.title}
                            </span>
                            <span className="channel-name sm-txt">
                                {data["uploader "]}
                            </span>
                            <span className="views-info sm-txt">
                                {data["views "]} views - {data.uploadDate} 
                            </span>
                        </div>
                    </div>
                </div>
                </Link>
                )}
            </div>
        </div>
    );
}

export default Home;