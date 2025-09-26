import { useState } from "react";
import "./pages.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = ()=>{

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loader, setLoader] = useState(false);
    const [signedUp, setSignUp] = useState(false);

    const navigate = useNavigate();

    async function signUp(e){
        e.preventDefault();
        setLoader(true)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', pass);

        // await fetch('http://localhost:3000/user/signup',{method: 'POST', body: formData})
        await axios.post('http://localhost:3000/user/login', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        }).then((res)=>{
            setLoader(false);
            setSignUp(true);
            console.log(res)
            sessionStorage.setItem("token", res.data.token);
            // setTimeout(()=>{
            //     navigate("/");
            // },3000)
        }).catch((err)=>{
            setLoader(false);
            console.log("error while signing up");
        })
    }

    return (
        <>
            <div className="signup-container">
                {signedUp ? <div className="success">
                    Signed-Up
                </div>: null}
                <form className="signup-form" onSubmit={signUp}>
                    <h1>Login</h1>
                    Email<input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" required />
                    Password<input type="password" onChange={(e)=>setPass(e.target.value)} name="password" required />
                    <button>{loader && <div className="loader">
                        <div className="load"></div>
                    </div>}Login</button>
                    <Link to={"/signup"}> Create an account </Link>
                </form>
            </div>
        </>
    )
}

export default SignIn;