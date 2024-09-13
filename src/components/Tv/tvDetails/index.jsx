import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './../../../Constants/Functions/ImgPath'
import {imgPath} from "../../../Constants/Functions/ImgPath";

export function TvDetails(){
    const {id} = useParams();
    const [tv, setTv] = useState(null);
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`)
            .then((res)=>{
                console.log(res.data);
                setTv(res.data);
            }).catch((err)=>{
                console.log(err);
        })
    }, [id]);

    return (
        <>
        <div className='container'>
            {tv ? (
                <div className="row">
                    <div className='col-md-4'>
                        <img src={imgPath(tv.poster_path)}/>
                    </div>
                    <div className='col-md-6 offset-2 d-flex align-items-center'>
                        <div>

                            <h1>{tv.name} </h1>
                            <br/>
                            <h4>{tv.overview}</h4>
                            <br/>
                            <h2><span className='text-warning'>First Eposide Date : </span> {tv.first_air_date}</h2>
                            <br/>
                            <h2><span className='text-warning'>Rate : </span> {tv.vote_average}</h2>

                        </div>
                    </div>
                </div>

            ) : <h2>loading...</h2>}
        </div>
        </>
    )
}