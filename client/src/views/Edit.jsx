import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../services/StoryService'

const Edit = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState("")

    const [getter, setter] = useState({
        title: "",
        genre: "",
        tagline: "",
        description: "",
        count: "",
        completed: false
    });


    const backHome = (e) => {
        e.preventDefault();
        console.log("Homeward")
        navigate("/")
    }

    useEffect(() => {
        http.get("/stories/" + id)
            .then(res => {
                console.log(res.data);
                setter(() => {
                    return {
                        ...res.data
                    }
                })
            })
            .catch(error => console.log(error))
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();
        http.put(`/stories/${id}`, getter)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate(`/stories/${id}/single`);
            })
            .catch(error => {
                console.log(error.response.data);
                setErrors(error.response.data.errors);
            });
    };


    const changeHandler = (e) => {
        setter((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }))
    }

    return (
        <div>
            <div className='spread'>
                <h1>Edit: {getter.title}</h1>
                <button className='button' onClick={backHome}>Back to Library</button>
            </div>
            <form onSubmit={submitHandler}>
                <div className='around buffer'>
                    <div className='space buffer spread'>
                        <div>
                            <label htmlFor="completed">Completed? (Select for yes)</label>
                            <input className='space' type="checkbox" name="completed" id="completed" checked={getter.completed} onChange={e => changeHandler(e)} />
                        </div>
                        <button className='button space'>Submit edits</button>
                    </div>
                    <div className='space buffer'>
                        <label htmlFor='genre'> Genre:</label>
                        <input className='space' type="text" id='genre' name='genre' value={getter.genre} onChange={e => changeHandler(e)} />
                    </div>
                    <div className='space buffer'>
                        <label htmlFor='tagline' >Tagline:</label>
                        <input className='space' type="text" id='tagline' name='tagline' value={getter.tagline} onChange={e => changeHandler(e)} />
                    </div>
                    <div className='space buffer'>
                        <label htmlFor='description'>Description:</label>
                        <input className='space' type="textarea" name='description' id='description' value={getter.description} onChange={e => changeHandler(e)} />
                    </div>
                    <div className='space buffer'>
                        <label htmlFor='dailyGoal' >Daily Goal:</label>
                        <input className='space' type="number" id='dailyGoal' name='dailyGoal' value={getter.dailyGoal} onChange={e => changeHandler(e)} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit
