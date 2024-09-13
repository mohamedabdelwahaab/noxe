import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, useNavigate} from "react-router-dom";
import {NavLinks} from "./NavLinks";


let navLinks = [
    {name: "Home", path: "/home"},
    {name: "movies", path: "/movies"},
    {name: "People", path: "/people"},
    {name: "Tv", path: "/tv"}
];
export function Navbar({userData,logout}){
    return <>
        <nav className="navbar navbar-expand-lg bg-dark bg-transparent navbar-dark">
            <div className="container">
                <Link className="navbar-brand fs-3" to="home">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userData !== null && <NavLinks links={navLinks} />}
                    </ul>
                    <ul className=' decor d-flex text-align-center'>
                        {userData != null && <><li className=' mx-3 mt-4'>
                            <Link to='https://www.facebook.com/' target='_blank' title='facebook'><i
                                className="text-light fs-3 me-3 fa-brands fa-facebook"></i></Link>
                            <Link to='https://www.instagram.com/' target='_blank' title='instagram'><i
                                className="text-light fs-3 me-3  fa-brands fa-instagram"></i></Link>
                            <Link to='https://x.com/' target='_blank' title='twitter'><i
                                className="text-light fs-3 me-3  fa-brands fa-twitter"></i></Link>
                            <Link to='https://open.spotify.com/' target='_blank' title='spotify'><i
                                className="text-light fs-3 me-3  fa-brands fa-spotify"></i></Link>
                        </li></>}
                        {userData == null &&
                            <li className='mx-3 mt-3'>
                                <li className="nav-item fs-3">
                                    <Link className="nav-link active" aria-current="page" to='login'>Login</Link>
                                </li>
                            </li>
                        }
                        {userData == null &&
                        <li className='mx-3 mt-3 fs-3'>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='Register'>Register</Link>
                            </li>
                        </li>
                        }
                        {userData !== null && <li className='mx-3 mt-3 fs-3'>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='login' onClick={logout}>Log Out</Link>
                            </li>
                        </li>}

                    </ul>

                </div>
            </div>
        </nav>

    </>
}