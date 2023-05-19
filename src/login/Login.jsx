import React, { useEffect, useRef, useState, useContext } from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../login/Login.css";
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// const LOGIN_URL = '/auth'

function Login() {
  const {setAuth} = useContext(AuthContext);
  const userRef=useRef();
  const errRef=useRef();
  const navigate = useNavigate();

  const [user,setUser] = useState('');
  const [pwd,setPwd] = useState('');
  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState(false);

  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[user,pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, user, pwd)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User logged In");
      navigate('/dashboard');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <div className='d-flex flex-row mt-2'>
                {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>😄 */}
                <span className="h1 fw-bold mb-0">Welcome Back :)</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>To connect with us please login with your personal info</h5>
              
              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <MDBInput ref={userRef} wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" autoComplete='off'
                onChange={(e)=> setUser(e.target.value)} value={user} required/>
                
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                autoComplete='off' onChange={(e)=> setPwd(e.target.value)} value={pwd} required/>

                <MDBBtn type='submit' className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
              </form>
              
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <Link className='forgot_link' to="/forgot"><span className='forgot_password'>Forgot password?</span></Link>
              {/* <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p> */}
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/register">Register</Link></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of service.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;