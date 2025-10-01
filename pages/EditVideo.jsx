import axios from "axios";
import React, { useState, useEffect } from "react";
import "./editvideo.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditVideo() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState(false);
  const [thumbnail, setThumb] = useState(null);
  const formData = new FormData();

  // fetch video data from backend using id from params and set it to state
  // to prefill the form with current data
  useEffect(() => {
    async function getData() {
      await axios
        .get(`http://localhost:3000/view/${id}`, {
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
    getData();
  }, []);

  // set default values as current data
  useEffect(() => {
    setTitle(data?.title || "");
    setDesc(data?.description || "");
    setCategory(data?.category || "");
  }, [data]);

  // function to handle thumbnail file input and set thumbnail state
  function handleThumb(e) {
    setThumb(e.target.files[0]);
  }

  // function to handle form submission and send updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);
    // console.log("Form submitted", formData);

    // send put request to backend to update video details
    await axios
      .put(`http://localhost:3000/video/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoader(false);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err.response.data.msg);
      });
  };
  return (
    <>
      {/* Video player */}
      <div className="container">
        <div className="video-wrapper">
          <video src={data?.videoUrl} controls />
        </div>
        {/* video details edit form */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              max={80}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              rows="4"
              value={desc}
              max={300}
              onChange={(e) => setDesc(e.target.value)}
              required
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              value={category}
              max={50}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
            {/* update thumbnail */}
            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="file" onChange={handleThumb} required />
            <button type="submit">
              {
                loader && (
                  <div className="loader">
                    <div className="load"></div>
                  </div>
                )
                // show "Updating..." text when video is being updated
              }
              {loader ? "Updating..." : "Update Details"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditVideo;
