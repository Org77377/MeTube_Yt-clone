import { useState } from "react";
import "./pages.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState('');
    const [uname, setuname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [logo, setLogo] = useState(null);
    const [imgUrl, setImage] = useState('');
    const [loader, setLoader] = useState(false);

    const uploadhandle = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setLogo(e.target.files[0])
    }

    const navigate = useNavigate();

    async function signUp(e) {
        e.preventDefault();
        setLoader(true)
        const formData = new FormData();
        console.log(name);
        formData.append('name', name);
        formData.append('username', uname);
        formData.append('email', email);
        formData.append('password', pass);
        formData.append('logo', logo);

        // await fetch('http://localhost:3000/user/signup',{method: 'POST', body: formData})
        await axios.post('http://localhost:3000/user/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setLoader(false);
            toast.success("Signed Up")
            toast.info("Redirecting to Login")
            setTimeout(() => {
                navigate("/login");
            }, 3000)
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.error, { hideProgressBar: true })
            setLoader(false);
        })
    }

    return (
        <>
            <div className="signup-container">
                <form className="signup-form" onSubmit={signUp}>
                    <h1>Signup</h1>
                    Name: <input type="text" onChange={(e) => setName(e.target.value)} name="name" required />
                    Username<input type="text" onChange={(e) => setuname(e.target.value)} name="username" required />
                    Email<input type="email" onChange={(e) => setEmail(e.target.value)} name="email" required />
                    Password<input type="password" onChange={(e) => setPass(e.target.value)} name="password" required />
                    Upload<input type="file" onChange={uploadhandle} required />
                    <div className="preview-container">
                        {imgUrl && <img src={imgUrl} alt="profile-image" className="preview-image" />}
                    </div>
                    <button>
                        {loader && <div className="loader">
                            <div className="load"></div>
                        </div>}{loader? "Please Wait" : "Signup"}
                    </button><br />
                    Already have an account - <Link to='/login' style={{ textDecoration: 'underline' }}> Login </Link> or <Link to="/" style={{ textDecoration: 'underline' }}>Use without account</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp;