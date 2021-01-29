import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const initialCredentials = {
    username: '',
    password: ''
  }
  const [credentials, setCredentials] = useState(initialCredentials)
  const [errorMessage, setErrorMessage] = useState('')
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        history.push('/protected')
      })
      .catch(err => {
        console.log(err)
        setErrorMessage('Username or Password not valid.')})
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <p>Username</p>
        <input type='text' name='username' onChange={handleChange} />
        <p>Password</p>
        <input type='password' name='password' onChange={handleChange} />
        {errorMessage !== '' ? <p>{errorMessage}</p> : console.log('no errors!')}
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.