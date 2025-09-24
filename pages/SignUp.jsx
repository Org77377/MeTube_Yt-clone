import { useState } from "react";
import "./pages.css";
import axios from "axios";

const SignUp = ()=>{

    const [name, setName] = useState('');
    const [uname, setuname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [logo, setLogo] = useState(null);

    const uploadhandle = (e)=>{
        setLogo(e.target.files[0])
    }
    const signup = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('channelName', name) 
        formData.append('username', uname) 
        formData.append('email', email) 
        formData.append('password', pass) 
        formData.append('logo', logo) 

        axios.post('localhost:3000/user/signup', formData).then((res)=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <>
            <div className="signup-container">
                <form onSubmit={signup} className="signup-form">
                    <h1>Signup</h1>
                    Name: <input type="text" onChange={(e)=>setName(e.target.value)} name="name" required />
                    Username<input type="text" onChange={(e)=>setuname(e.target.value)} name="username" required />
                    Email<input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" required />
                    Password<input type="password" onChange={(e)=>setPass(e.target.value)} name="password" required />
                    Upload<input type="file" onChange={uploadhandle} name="logo" required />
                    <button>Signup</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;