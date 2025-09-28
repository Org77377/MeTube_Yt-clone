import { useState } from "react";
import "./pages.css";
import axios from "axios";
import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignIn = ()=>{

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    async function signIn(e){
        e.preventDefault();
        setLoader(true)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', pass);
        const ctoken = sessionStorage.getItem('token')

        await axios.post('http://localhost:3000/user/login', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': ctoken,
            }
        }).then((res)=>{
          setLoader(false);
          toast.success(res.data.msg, { autoClose: 1000 })
          setTimeout(()=>{
            toast.info("Redirecting to Homepage", {autoClose: 2000})
          },1000);
          setTimeout(()=>{
            navigate("/", {replace: true});
          },3000)
          sessionStorage.setItem("token", res.data.token);
        }).catch((err)=>{
            setLoader(false);
            toast.error(err.message)
            toast.error(err.response.data.msg, {hideProgressBar: true})
        })
    }

    return (
        <>
            <div className="signup-container">
                <form className="signup-form" onSubmit={signIn}>
                    <h1>Login</h1>
                    Email<input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" required />
                    Password<input type="password" onChange={(e)=>setPass(e.target.value)} name="password" required />
                    <button>{loader && <div className="loader">
                        <div className="load"></div>
                    </div>}{loader ? "Logging in.." : "Login"}</button>
                    <br />
                    New User? - <Link to={"/signup"}> Create an account </Link>
                </form>
            </div>
        </>
    )
}

export default SignIn;