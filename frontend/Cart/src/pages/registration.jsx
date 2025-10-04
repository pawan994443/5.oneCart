import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';


axios.defaults.withCredentials = true;

function Registration() {
    let [show, setShow] = useState(false);
    let { serverUrl } = useContext(authDataContext)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { getCurrentUser } = useContext(userDataContext)

    let navigate = useNavigate()

    
    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(
                serverUrl + '/api/auth/registration',
                { name, email, password },
                { withCredentials: true }
            )
             console.log(result.data) 
            await getCurrentUser()
            navigate("/")
            

        } catch (error) {
            console.log("Signup Error:", error.response?.data || error.message)
        }
    }
    const googleSignup = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email 

            const result = await axios.post(
                serverUrl + "/api/auth/googleLogin",
                { name, email },
                { withCredentials: true }
            )

            console.log("Google Login Response:", result.data)
            await getCurrentUser()
            navigate("/")

        } catch (error) {
            console.log("Google Signup Error:", error.response?.data || error.message)
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            {/* Header */}
            <div className='w-[100%] h-[88px] flex items-center justify-start px-[30px] gap-[8px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="logo" />
                <h1 className='text-[22px] font-sans'>VCart</h1>
            </div>

            {/* Title */}
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Registration Page</span>
                <span className='text-[16px]'>Welcome to Vcart, Place your Order</span>
            </div>

            {/* Form Card */}
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
                    
                    {/* Google Signup */}
                    <div 
                        className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' 
                        onClick={googleSignup}
                    >
                        <img src={google} alt="google" className='w-[20px]'/>Registration with Google
                    </div>

                    {/* Divider */}
                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>

                    {/* Input Fields */}
                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                        <input 
                            type='text'
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Username'
                            required
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                        />

                        <input 
                            type='email'
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Email'
                            required
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                        />

                        <input 
                            type={show ? "text" : "password"}
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                            placeholder='Password'
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />

                        {/* Show/Hide Password */}
                        {!show && <FaRegEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={()=>setShow(prev => !prev)}/>}
                        {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={()=>setShow(prev => !prev)}/>}

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'
                        >
                            Create Account
                        </button>

                        {/* Login Link */}
                        <p className='flex gap-[10px]'>
                            You already have an account? 
                            <span 
                                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                                onClick={()=>navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration
