import React, {useEffect} from 'react';
import axios from "axios";
import {useState} from "react";
import './style.css'
import Movies from "../movies";

export default function Home() {
    let [data, setData] = useState([]);
    let [newData, setNewData] = useState([]);
    let [loading, setLoading] = useState(false);
   function getData(){
       axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=c9fac173689f5f01ba1b0420f66d7093').
        then((res)=>{
            console.log(res.data.results);
           setData(res.data.results);
           setLoading(true);
            console.log(data)
            let copy = [... res.data.results];
            copy.length=copy.length/2;
            setNewData(copy)
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <>


            <div className="container">
                <div className="row">
                    <div className='col-md-6'>
                        <div className='mt-5'>
                            <h1>Trending</h1>
                            <h1>Movies</h1>
                            <h1>To Watch Right Now</h1>
                            <p className='text-info fs-5 '>Top Trending Movies by Day</p>
                            <hr/>
                        </div>
                    </div>

                    {loading?newData?.map((item,i)=>(
                        <div key={i} className=' col-md-3'>
                            <div className='movie-card mt-5'>
                                <img className='figure-img object-fit-fill' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
                                <h4 className='text-center'>{item.title}{item.name}</h4>
                            </div>
                        </div>
                    )): <>
                        <div className="spinner-border d-flex justify-content-center align-items-center text-info" role="status">
                            <span className="visually-hidden d-flex justify-content-center align-items-center">Loading...</span>
                        </div>
                    </>}

                </div>
                <div></div>
            </div>
        </>
    )
}