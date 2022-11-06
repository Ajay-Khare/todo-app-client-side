import { useNavigate } from "react-router-dom";
import "./addNewActivity.css";
import { useState } from "react";

const NewActivity = () => {
    const navigate = useNavigate()
    const [activity, setActivity] = useState('');


    const createHandler = (e) => {
        fetch("http://localhost:8080/todoList", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accessToken": sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ activity })
        })
            .then(data => data.json())
            .then(res => {
                if (res.message === "success") {
                    alert("task created successfull");
                    navigate("/todoList")
                }
            });

    }

    return (
        <>
            <div className="activityContainer">
                <div>
                    <p>Create new activity</p>
                    <input type="text" value={activity} onChange={(e)=>setActivity(e.target.value) } />
                    <br />
                    <button onClick={createHandler}>Create</button>
                </div>
            </div>
        </>
    )
}

export default NewActivity;