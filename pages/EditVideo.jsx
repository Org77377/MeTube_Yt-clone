import React, { useState } from "react";

function EditVideo(){
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnail, setThumb] = useState(null)
  const formData = new FormData();

  function handleFile(e){
    setThumb(e.terget.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("title", title)
    formData.append("description", desc)
    formData.append("category", category)
    formData.append("thumbnail", thumbnail)
    console.log("Form submitted", formData);
  };

  return (
    <>

      <div className="container">
        <div className="video-wrapper">
          <video
            src=""
            controls
            poster={formData.thumbnail ? URL.createObjectURL(formData.thumbnail) : ""}
          />
        </div>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e)=>setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={(e)=>setDesc(e.target.value)}
              required
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="thumbnail"
              onChange={(e)=>setCategory(e.target.value)}
            />

            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleFile}
            />

            <button type="submit">Update Details</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditVideo;
