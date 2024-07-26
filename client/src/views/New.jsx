import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../services/StoryService'

const New = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState("")

    const [getter, setter] = useState({
        title: "",
        genre: "",
        tagline: "",
        description: "",
        count: "",
        completed: false
    });

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     console.log("Created")
    //     navigate("/stories/single");
    // }

    const backHome = (e) => {
        e.preventDefault();
        console.log("Homeward")
        navigate("/")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        http.post(`/stories`, getter)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate(`/`);
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
                <h1>New Title</h1>
                <button className='button' onClick={backHome}>Back to Library</button>
            </div>
            <div className='around buffer'>
                <form onSubmit={submitHandler}>
                    <div className='buffer'>
                        <label htmlFor='title'> Title: </label>
                        <input className='space' type="text" id='title' value={getter.title} name='title' onChange={e => changeHandler(e)}  />
                    </div>
                    <div className='buffer'>
                        <label htmlFor='genre'>Genre:</label>
                        <input className='space' type="text" id='genre' value={getter.genre} name='genre' onChange={e => changeHandler(e)}  />
                    </div>
                    <div className='buffer'>
                        <label htmlFor='tagline' >Tagline: </label>
                        <input className='space' type="text" id='tagline' value={getter.tagline} name='tagline' onChange={e => changeHandler(e)} />
                    </div>
                    <div className='buffer'>
                        <label htmlFor='description'>Description: </label>
                        <input className='space' type="textarea" id='description' value={getter.description} name='description' onChange={e => changeHandler(e)} />
                    </div>
                    <div className='buffer'>
                        <label htmlFor='count'>Word Count: </label>
                        <input className='space' type="text" id='count' value={getter.count} name='count' onChange={e => changeHandler(e)} />
                    </div>
                    <div className='spread'>
                        <div>
                            <label htmlFor="completed">Completed? (Select for yes)</label>
                            <input className='space' type="checkbox" name="completed" id="completed" checked={getter.completed} onChange={e => changeHandler(e)} />
                        </div>
                        <button className='button space'>Create New</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default New
