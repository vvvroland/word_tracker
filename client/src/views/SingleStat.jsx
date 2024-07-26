import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import http from '../services/StoryService';
import BarGraph from '../components/BarGraph';
import { DummyData } from '../components/DummyData';
import LineGraph from '../components/LineGraph';


const SingleStat = () => {

    const navigate = useNavigate();

    const [story, setStory] = useState(null);
    const [errors, setErrors] = useState("");
    const { id } = useParams();

    useEffect(() => {
        http.get("/stories/" + id)
            .then(res => {
                // console.log(res.data);
                console.log(res.data.history);
                setStory(res.data);
            })
            .catch(error => console.log(error))
    }, [id]);

    const toEdit = (e) => {
        e.preventDefault();
        console.log("Created")
        navigate(`/stories/${id}/edit`);
    }

    const backHome = (e) => {
        e.preventDefault();
        console.log("Homeward")
        navigate("/")
    }


    const countHandler = (e) => {
        e.preventDefault();
        console.log("Word count data magic")
        const update = { "day": story.history.length + 1, 'totalCount': Number(story.count) }
        const updateHistory = [...story.history, update]
        // console.log(update)
        // const oldTotal=story.history[story.history.length-1]['totalCount']
        let oldTotal=0
        story.history==0?oldTotal=0:oldTotal=story.history[story.history.length-1]['totalCount']
        const difference=story.count-oldTotal
        const dailyUpdate={"day":story.daily.length+1, "dailyCount":Number(difference)}
        const updateDaily=[...story.daily, dailyUpdate]
        // const checking = story.count*2
        // console.log(checking)
        // const difference=story[story.history.length-1][story.history.totalCount]-story[story.history.length-2][story.history.totalCount]
        // console.log(difference) 


        http.put(`/stories/${id}`, { history: updateHistory, count: story.count, daily:updateDaily }) //Add daily:daily.count when figured
            .then(res => {
                console.log(res);
                console.log(res.data);
                setStory((prevValue) => ({
                    ...prevValue, history: updateHistory, daily:updateDaily
                }))
                // navigate(`/stories/${id}/single`);
            })
            .catch(error => {
                console.log(error.response.data);
                setErrors(error.response.data.errors);
            });
    }


//daily is [{day:1, dailytotal:newTotalCount-leastOldTotal Count}]
//const updateDay = {"day": story.daily.length+1, "dailyCount":difference}
//difference=story.history[day]-story.history[day-1] but that doesn't work because those are the day values



    const changeHandler = (e) => {
        setStory((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }))
    }

    return (
        <div>
            {story ? (
                <div>
                    {/* {JSON.stringify(story)} */}
                    <div className='spread'>
                        <h1>{story.title}</h1>
                        <h2>Total Word Count: {story.count}</h2>
                    </div>
                    <div className='right space'>
                        <button className='button' onClick={backHome}>Back to Library</button>
                    </div>
                    <div className='around buffer'>
                        <div className='spread'>
                            <div className='line'>
                                <h3>Completed: </h3>
                                {story.completed ? <h4>Yes</h4> : <h4>No</h4>}
                            </div>
                            <div className='line space'>
                                <h3>Daily Word Goal:</h3>
                                <h4>{story.dailyGoal}</h4>
                            </div>
                            <button className='button' onClick={toEdit}>Edit Details</button>
                        </div>
                        <div className='line space'>
                            <h3>Genre: </h3>
                            <h4>{story.genre}</h4>
                        </div>
                        <div className='line space'>
                            <h3>Tagline: </h3>
                            <h4>{story.tagline}</h4>
                        </div>
                        <div className='line space'>
                            <h3>Description: </h3>
                            <h4>{story.description}</h4>
                        </div>
                    </div>
                    <div className='line between space'>
                        <label htmlFor="count">Current Word Count: </label>
                        <input type="number" id='count' value={story.count} name='count' onChange={e => changeHandler(e)} />
                        <button className='button' onClick={countHandler}>Update Word Count</button>
                    </div>
                    <table className='table table-dark table-striped'>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Running Total</th>
                                <th>Running Goal</th>
                                <th>Daily Count</th>
                                <th>Daily Goal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                story.history.map((theData,i) => {
                                    return (
                                        <tr key={theData._id}>
                                            <td>{theData.day}</td>
                                            <td>{theData.totalCount}</td>
                                            <td>{theData.day*story.dailyGoal}</td>
                                            <td>{story.daily[i].dailyCount}</td>
                                            <td>{story.dailyGoal}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div><BarGraph chartData={story.history} goal={story.dailyGoal} /></div>
                    <div><LineGraph chartData={story.daily} goal={story.dailyGoal} /></div>
                </div>)
                : <h2>Loading...</h2>
            }
        </div>
    )
}

export default SingleStat


//Before I changed this, this is what it said.

// story.history.map((theData) => {
//     return (
//         <tr key={theData._id}>
//             <td>{theData.day}</td>
//             <td>{theData.totalCount}</td>
//             <td>{theData.day*story.dailyGoal}</td>
//             <td>daily</td>
//             <td>{story.dailyGoal}</td>
//         </tr>
//     )
// })