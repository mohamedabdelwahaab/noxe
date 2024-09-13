import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './style.css';
import {imgPath} from "../../Constants/Functions/ImgPath";

export default function Movies() {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);

    function getData(type,callbac) {
        axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`)
            .then((res) => {
                setData(res.data.results);
                setLoading(true);
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getData(`all`);
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                {loading ? data?.map((item, i) => (
                    <div key={i} className='col-md-3'>
                        <div className='movie-card mt-5'>
                            <Link className='link-light' to={`/movies/moviesDetails/${item.id}`}>
                                <img className='figure-img object-fit-fill'
                                     src={imgPath(item.poster_path)} />
                            </Link>
                            <Link className='link-light text-decoration-none' to={`/movies/moviesDetails/${item.id}`}>
                                <h4 className='text-center text-decoration-none'>{item.title || item.name}</h4>
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
