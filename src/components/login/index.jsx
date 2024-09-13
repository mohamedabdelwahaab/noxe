
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Joi, {allow} from "joi";


export default function Login({saveUserData}){
    let [formData, setFormData] = useState({
        email:'',
        password:'',
    });
    let navigate = useNavigate();
    let [errorMessage, setErrorMessage] = useState("");
    let [errors, setErrors] = useState([]);
    function getData(e){

        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data);
        console.log(data)
    }
    function validation(){
        let schema = Joi.object({
            email: Joi.string().email({
                minDomainSegments:2,
                tlds: {allow: ['com', 'net']
                }
            }).required(),
            password: Joi.string().required(),
        })
        return schema.validate(formData, {abortEarly: false});
    }

    function handleSubmit(e){
        let statusError = validation();
        if (statusError?.error){
            setErrors(statusError?.error);
        }else {
            validation();
            e.preventDefault();
            axios.post('http://hawas.runasp.net/api/v1/Login',formData).then((res)=>{
                navigate('/home');
                localStorage.setItem('Token', res.data.jwt);
                saveUserData();
                console.log(res.data.jwt);
            }).catch((err)=>{
                setErrorMessage(err.response.data);
                console.log(err);
            })
        }

    }


    return (
        <>
            <h1 className='text-center mt-5'>Login</h1>
            {errorMessage.length?<h1 className='alert alert-danger'>{errorMessage}</h1>:<></>}
            {errors?.length>0? errors?.map((err,i)=>(
                <h4 key={i} className='alert alert-danger'>{err.response.data}</h4>
            )):<></>}
            <div >
                <form className='w-75 mx-auto' onSubmit={handleSubmit}>
                    <label className='form-label' htmlFor=''>Email</label>
                    <input className='form-control mb-2' type='email' name='email' placeholder='Email' required={true}
                           onChange={getData}/>
                    <label className='form-label mb-2' htmlFor=''>Password</label>
                    <input className='form-control mb-3' type='password' name='password' placeholder='Password'
                           required={true} onChange={getData}/>
                    <button className='btn btn-outline-info' type='submit'>Register</button>
                </form>
            </div>
        </>
    )
}