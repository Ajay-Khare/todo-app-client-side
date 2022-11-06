import { useState } from "react"
import { useNavigate } from "react-router-dom";
import("./login-register.css")

function Login() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const inpHandler = (e) => {
        // console.log(userData)
        e.preventDefault();
        let temp = e.target.value
        if (e.target.name === "email") {
            setUserData({ ...userData, email: temp })
        }
        if (e.target.name === "password") {
            setUserData({ ...userData, password: temp })
        }
    }
    const loginHandler = (e) => {
        // console.log(userData)
        e.preventDefault();
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                if (res.message === "success") {
                    sessionStorage.setItem("accessToken", res.token)
                    navigate("/todoList")
                }
                if (res.message === "user not registered") {
                    alert("user not registered");
                }
                if (res.message === "wrong password") {
                    alert("wrong password")
                }
            })
    }


    return (
        <div className='main-container'>
            <div className='middle-container'>
                <h2 className='h2tag'>Member Login</h2>
                <form className='formclass'>
                    <input type="email" value={userData.email} name="email" onChange={inpHandler} placeholder='USERNAME' required />
                    <input type="password" value={userData.password} name="password" onChange={inpHandler} placeholder='Password' required />
                    <button className='buttonclass' onClick={loginHandler}>Login</button>
                </form>
                <button className='buttonclass' onClick={()=>navigate("/register")}>Register</button>
                <p className='ptag'>Forgot Password?</p>

            </div>

        </div>
    )

}
export default Login