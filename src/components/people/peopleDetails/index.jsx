import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './../../../Constants/Functions/ImgPath'
import {imgPath} from "../../../Constants/Functions/ImgPath";
export function PeopleDetails() {
    const { id } = useParams();
    const [people, setPeople] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`)
            .then((res) => {
                setPeople(res.data);
            }).catch((err) => {
            console.log(err);
        });


    }, [id]);

    return (
        <div className='container'>
            {people ? (
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={imgPath(people.profile_path)} alt={people.name} />
                    </div>
                    <div className='col-md-6 offset-2 d-flex align-items-center'>
                        <div>
                            <h1>{people.name}</h1>
                            <h4>{people.biography}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}
