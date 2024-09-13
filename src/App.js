import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { Navbar } from "./components/Navbar";
import Movies from "./components/movies";
import People from "./components/people";
import Tv from "./components/Tv";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { MoviesDetails } from "./components/movies/moviesDetails";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {PeopleDetails} from "./components/people/peopleDetails";
import {TvDetails} from "./components/Tv/tvDetails";

function App() {
  let [userData, setUserData] = useState(null);

  function saveUserData() {
    if (localStorage.getItem('Token')){
      let encode = localStorage.getItem('Token');
      let decode = jwtDecode(encode);
      setUserData(decode);
    }else {
      setUserData(null);
    }
  }
  useEffect(()=>{
    saveUserData();
  },[])

  function logout() {
    setUserData(null);
    localStorage.removeItem("Token");
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem('Token') == null) {
      return <Navigate to={'/login'} />;
    } else {
      return props.children;
    }
  }

  useEffect(() => {
    if (localStorage.getItem('Token')) {
      saveUserData();
    }
  }, []);

  return (
      <>
        <Navbar logout={logout} userData={userData} />
        <div className="container">
          <Routes>
            <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>}/>
            <Route path="movies/moviesDetails/:id" element={<ProtectedRoute><MoviesDetails /></ProtectedRoute>} />
            <Route path="people" element={<ProtectedRoute><People /></ProtectedRoute>} />
            <Route path='people/peopleDetails/:id' element={<ProtectedRoute><PeopleDetails /></ProtectedRoute>} />
            <Route path="tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />
            <Route path='tv/tvDetails/:id' element={<ProtectedRoute><TvDetails /></ProtectedRoute>} />

            <Route path="login" element={<Login saveUserData={saveUserData} />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </>
  );
}

export default App;
