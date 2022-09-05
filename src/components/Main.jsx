import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setImages, setQuery, setLoading } from '../slices/mySlice';

const API_KEY = process.env.REACT_APP_ACCESS_KEY;
export default function Main() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.myState)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Client-ID ${API_KEY}`
        }
    };

    useEffect(() => {
        //get date
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let date = new Date()
        let day = (days[date.getDay()])
        // eslint-disable-next-line
        let month = (months[date.getMonth()])
        search(day)
        // eslint-disable-next-line
    }, [])

    function search(query) {
        dispatch(setLoading(true))
        fetch(`https://api.unsplash.com/search/photos/?page=1&query=${query}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                // console.log(data.results)
                dispatch(setImages(data.results))
                setTimeout(() => {
                    dispatch(setLoading(false))
                }, 1000)
            })
    }

    return (
        <div className={'main-container ' + state.theme}>
            <div style={{ display: state.loading === true ? "flex" : "none" }} className="loading">
                <div className="dots-container">
                    <div className="dot dot1"> </div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                </div>
            </div>
            <div className="main">

                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search(state.query);
                            dispatch(setQuery(""))
                        }
                    }}
                    onChange={(e) => {
                        dispatch(setQuery(e.target.value))
                    }}
                    type="text" placeholder='Search' className="search" value={state.query} />

                <div className="images-container">
                    {state.images.map(obj => {
                        return (
                            <img
                                key={obj.id}
                                onClick={() => {
                                    window.open(obj?.links?.html, '_blank')
                                }}
                                className='unsplash-img' src={obj?.urls?.regular} alt="" />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
