import { useState } from "react";
import "./pages.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [uname, setuname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [logo, setLogo] = useState(null);
  const [imgUrl, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  // function to handle image file input and set image url for preview when file is selected
  const uploadhandle = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };
  const navigate = useNavigate();
  // function to handle signup form submission
  // send form data to backend using axios
  async function signUp(e) {
    e.preventDefault();
    setLoader(true);
    // create form data object and append form fields to it
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", uname);
    formData.append("email", email);
    formData.append("password", pass);
    formData.append("logo", logo);

    // send post request to backend to signup user
    await axios
      .post("http://localhost:3000/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoader(false);
        toast.success("Signed Up");
        toast.info("Redirecting to Login");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.error, { hideProgressBar: true });
        setLoader(false);
      });
  }

  return (
    <>
      {/* Signup form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={signUp}>
          <h1>Signup</h1>
          Name:{" "}
          <input
            type="text"
            pattern="^[A-Za-z ]{5,15}$"
            title="Name must be between 5 and 25 characters withouth any special letters."
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
          />
          Username
          <input
            type="text"
            pattern="^[A-Za-z0-9_-]{5,15}$"
            title="Username must be between 5 and 15 characters and may only contain letters, numbers, underscores, or hyphens."
            onChange={(e) => setuname(e.target.value)}
            name="username"
            required
          />
          Email
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          Password
          <input
            type="password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
            title="Password must be 8-20 characters long, include at least one letter, one number, and one special character (!@#$%^&*)."
            onChange={(e) => setPass(e.target.value)}
            name="password"
            required
          />
          Upload
          <input type="file" accept="image/*" onChange={uploadhandle} required />
          {/* Preview uploaded image */}
          <div className="preview-container">
            {imgUrl && (
              <img src={imgUrl} alt="profile-image" className="preview-image" />
            )}
          </div>
          {/* signup button */}
          <button>
            {/* loading spinner */}
            {loader && (
              <div className="loader">
                <div className="load"></div>
              </div>
            )}
            {loader ? "Please Wait" : "Signup"}
          </button>
          <br />
          {/* Link to login page */}
          Already have an account -{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            {" "}
            Login{" "}
          </Link>{" "}
          or{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            Use without account
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
