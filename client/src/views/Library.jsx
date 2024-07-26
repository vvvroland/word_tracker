import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import http from '../services/StoryService';

const Library = () => {

    const navigate = useNavigate();

    const addTitle = (e) => {
        e.preventDefault();
        console.log("New One")
        navigate('/stories/new')
    }

    const [library, setLibrary] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        http.get("/stories")
            .then((response) => {
                console.log(response.data)
                setLibrary(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrors(errors.response.data.errors)
            })
    }, [])

    let sum=0;
    const total = library.map(p=>p.count)
    for(let i=0; i<total.length; i++){
        sum+=total[i]
    }

    return (
        <div>
            <div className='spread'>
                <h1>Your Library</h1>
                <h2>Total Word Count: {sum}</h2>
            </div>
            <button className='button space right' onClick={addTitle}>Add Title</button>
            <table className='table table-dark table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Word Count</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        library.map((theStory) => {
                            return (
                                <tr key={theStory._id}>
                                    <td><Link to={`/stories/${theStory._id}/single`}>{theStory.title}</Link></td>
                                    <td>{theStory.count}</td>
                                    <td>{theStory.completed?"yes":"no"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Library
