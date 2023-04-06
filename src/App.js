//React
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import Login from './components/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Header from './components/Header';
import Protected from './components/Protected';
//packages
import Cookies from 'js-cookie';
//utils
import { getToken } from './utils/CommonUtils';
import JobPage from './components/JobPage';

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
          <Route path="/login" element={<Login signIn={signIn} />} />
          <Route
            exact path="/"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home />
              </Protected>
            }
          />
          <Route
            exact path="/jobs"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Jobs />
              </Protected>
            }
          />
          <Route
            exact path="/jobs/:jobId"
            element={
              <Protected isSignedIn={isSignedIn}>
                <JobPage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
