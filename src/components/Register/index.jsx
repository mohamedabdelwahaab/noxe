import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Joi, {allow} from "joi";


export default function Register(){
    let [formData, setFormData] = useState({
        userName:'',
        dateOfBirth:'',
        email:'',
        password:'',
        rePassword:'',
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
            userName: Joi.string().alphanum().min(3).max(50).required(),
            dateOfBirth: Joi.date().required(),
            email: Joi.string().email({
                minDomainSegments:2,
                tlds: {allow: ['com', 'net']
                }
            }).required(),
            password: Joi.string().required(),
            rePassword: Joi.string().required(),
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
           axios.post('http://hawas.runasp.net/api/v1/Register',formData).then((res)=>{
               navigate('/login');
               console.log(res);
           }).catch((err)=>{
               setErrorMessage(err.response.data);
               console.log(err);
           })
       }

    }


    return (
        <>
        <h1 className='text-center mt-5'>Register Now</h1>
            {errorMessage.length?<h1 className='alert alert-danger'>{errorMessage}</h1>:<></>}
            {errors?.length>0? errors?.map((err,i)=>(
                <h4 key={i} className='alert alert-danger'>{err.response.data}</h4>
            )):<></>}
         <div >
             <form className='w-75 mx-auto' onSubmit={handleSubmit}>
                 <label className='form-label' htmlFor=''>User Name</label>
                 <input className='form-control mb-2' type='text' name='userName' placeholder='Username' required={true}
                        onChange={getData}/>
                 <label className='form-label' htmlFor=''>Date of Birth</label>
                 <input className='form-control mb-2' type='date' name='dateOfBirth' placeholder='Username'
                        required={true}
                        onChange={getData}/>
                 <label className='form-label' htmlFor=''>Email</label>
                 <input className='form-control mb-2' type='email' name='email' placeholder='Email' required={true}
                        onChange={getData}/>
                 <label className='form-label mb-2' htmlFor=''>Password</label>
                 <input className='form-control mb-3' type='password' name='password' placeholder='Password'
                        required={true} onChange={getData}/>
                 <label className='form-label mb-2' htmlFor=''>Password configration</label>
                 <input className='form-control mb-3' type='password' name='rePassword' placeholder='Password'
                        required={true} onChange={getData}/>
                 <button className='btn btn-outline-info' type='submit'>Register</button>
             </form>
         </div>
        </>
    )
}