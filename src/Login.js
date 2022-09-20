import React from 'react'
import { Link, Navigate, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [ForgotPassword, setForgotPassword] = useState(false);
  const nav = useNavigate()
  const handlelogin=(e)=>{
    e.preventDefault()

    const data={
      applicationNo:document.getElementById("userID").value,
      password     :document.getElementById("password").value,
    }
    console.log(data)
    axios
    .post("https://ams-backend-api.herokuapp.com/user/login",data)
    .then((response) => {
      console.log(response)
      if(response.status === 200){
        nav("/nriform")
        window.alert("login success")
      }else{
        window.alert("login failed")
      }
    }).catch((error)=>{
      console.log(error)
      window.alert('login failed')
    })
  }

  return (
    <div className="min-w-screen relative  h-screen flex items-center justify-center bg-zinc-700">
      <div className="w-full top-1 h-14 absolute z-20 flex items-center justify-between px-8">
        <Link to="/">
        home
        </Link>
      </div>
      {ForgotPassword ? (
        <form
          action=""
          className="w-80 sm:w-96 p-4 sm:p-8  h-auto absolute z-20 shadow-xl rounded-sm shadow-zinc-900 bg-white"
        >
          <p className="text-2xl sm:text-3xl mt-3 uppercase text-center  sm:font-semibold">
            Forgot Password
          </p>
          <div className="w-full mt-5 space-y-7 p-2 h-auto ">
            <p className="h-auto text-center w-full border-[2px] text-pink-700 bg-pink-50 rounded-md p-3 text-md border-pink-700 italic ">
              bla bla bla ...
            </p>
            <input
              placeholder="Registered Email-ID"
              type="email"
              className="h-12 w-full border-[2px] rounded-md pl-4 text-xl focus:outline-none focus:border-pink-500 italic border-gray-500"
            />
            <button className="w-auto px-4 text-white text-lg rounded-md hover:bg-pink-700 bg-pink-800 h-12">
              Resend
            </button>
          </div>
          <p
            onClick={() => {
              setForgotPassword(!ForgotPassword);
            }}
            className="text-right cursor-pointer hover:text-pink-700 text-lg mr-4 "
          >
            Sign-In
          </p>
        </form>
      ) : (
        <form
          action=""
          onSubmit={Login}
          className="w-80 sm:w-96 p-4 sm:p-8  h-96 absolute z-20 shadow-xl rounded-sm shadow-zinc-900 bg-white"
        >
          <p className="text-4xl mt-3 text-center sm:font-semibold">SIGN-IN</p>
          <div className="w-full mt-5 space-y-8 p-2 h-auto ">
            <input
              placeholder="Registration No."
              type="text"
              id="userID"
              className="h-12 w-full border-[2px] rounded-md pl-4 text-xl focus:outline-none focus:border-pink-500 italic border-gray-500"
            />
            <input
              placeholder="Password"
              type="text"
              id="password"
              className="h-12 w-full border-[2px] rounded-md pl-4 text-xl focus:outline-none focus:border-pink-500 italic border-gray-500"
            />
            <div className='w-24 px-4 py-2 text-white text-lg rounded-md hover:bg-pink-700 bg-pink-800' onClick={handlelogin}>
                Sign-In
            </div>
          </div>
          <p
            onClick={() => {
              setForgotPassword(!ForgotPassword);
            }}
            className="text-right cursor-pointer hover:text-pink-700 text-lg mr-4 "
          >
            Forgot Password!
          </p>
        </form>
      )}
    </div>
  )
}

export default Login