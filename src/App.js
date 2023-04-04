import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Header from './components/Header';
import Protected from './components/Protected';
import Cookies from 'js-cookie';
import { getToken } from './utils/CommonUtils';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  
  useEffect(()=>{
    getToken() ? setIsSignedIn(true) : setIsSignedIn(false);
  }, [])

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    Cookies.remove("token");
    setIsSignedIn(false);
  };
  // console.log({isSignedIn});
  // console.log(getToken())
  return (
    <div className="App">
      <BrowserRouter>
        {isSignedIn && <Header signOut={signOut} />}
        <Routes>
          <Route path="/" 
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home />
              </Protected>
            } 
          />
          <Route path="/login" element={<Login signIn={signIn} />} />
          <Route
            path="/"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/jobs"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Jobs />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
