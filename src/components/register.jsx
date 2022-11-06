import { useState } from 'react'
// import user from '../../../server/models/user';
import './register.css'
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        name: "",
        password: "",
        confPass: ""
    })

    const inpHandler = (e) => {
        if (e.target.name === "email") {
            setUserData({ ...userData, email: e.target.value })
        }
        if (e.target.name === "name") {
            setUserData({ ...userData, name: e.target.value })
        }
        if (e.target.name === "password") {
            setUserData({ ...userData, password: e.target.value })
        }
        if (e.target.name === "confirmPass") {
            setUserData({ ...userData, confPass: e.target.value })
        }
    }

    const registerHandler = (e) => {
        e.preventDefault();
        console.log(userData.password, userData.confPass)
        if (userData.password === userData.confPass) {
            fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    name: userData.name,
                    password: userData.password
                })
            })
                .then(data => data.json())
                .then(res => {
                    if (res.message === "success") {
                        alert("Successfully registered")
                        navigate("/")
                    }
                    if (res.message === "user is allready exist") {
                        alert('user is allready exist');
                    }
                })
        }
        else {
            alert("pasword does not match")
        }

    }

    return (
        <div className='main-container'>
            <div className='middle-container'>
                <h2 className='h2tag'>Register</h2>
                <form className='formclass'>
                    <input type="email" placeholder='USERNAME' name="email" required onChange={inpHandler} />
                    <input type="text" placeholder='NAME' name="name" required onChange={inpHandler} />
                    <input type="password" placeholder='Password' name="password" required onChange={inpHandler} />
                    <input type="password" placeholder='Confirm Password' name="confirmPass" required onChange={inpHandler} />
                    <button className='buttonclass' onClick={registerHandler}>Register</button>
                </form>
                <p className='ptag' onClick={() => navigate("/")}>Allready Registered? Login to Login</p>

            </div>

        </div>
    )

}
export default Register