import React, { useEffect, useState } from "react";
import axios from "axios";
import {Outlet, useParams} from "react-router-dom";

export function MoviesDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`)
            .then(res => {
                setMovie(res.data);
            }).catch(err => {
            console.log(err);
        });
    }, [id]);

    return (
        <>

            <div className='container'>

                {movie ? (
                    <div className='container'>
                        <div className='movie-details row'>
                            <div className='col-md-4'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            </div>
                            <div className='col-md-7 offset-1 d-flex align-items-center'>
                                <div>
                                    <h1 >{movie.title}</h1>
                                    <br/>
                                    <h4>{movie.overview}</h4>
                                    <br/>
                                    <h2><span className='text-warning'>Release date:</span> {movie.release_date}</h2>
                                    <br/>
                                    <h2><span className='text-warning'>Rating:</span> {movie.vote_average}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <h2>Loading...</h2>
                )}

            </div>
        </>

    );
}
