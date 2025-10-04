import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaRegEye } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

function Login() {
    let [show,setShow] = useState(false);
      let [email,setEmail] = useState("")
      let [password,setPassword] = useState("")
      let {serverUrl} = useContext(AuthDataContext)
      let {adminData , getAdmin} = useContext(adminDataContext)
      let navigate = useNavigate()
      const [loading , setLoading] = useState(false)


      const AdminLogin = async (e) =>{
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/adminlogin',{email , password} , {withCredentials:true})
            console.log(result.data)
            toast.success("Admin Login Successfully")
            getAdmin()
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Admin Login Failed")
            
        }
      }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
          <div className='w-[100%] h-[88px] flex items-center justify-start px-[30] gap-[8px] curse-pointer' >
          <img className='w-[40px]' src={logo} alt="" />
          <h1 className='text-[22px] font-sans'>VCart</h1>
          </div>
          <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
            <span className='text-[25px] font-semibold'>Login</span>
            <span className='text-[16px]'>Welcome to Vcart, Apply to Admin Login</span>
    
          </div>
          <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
            <form action=""onClick={AdminLogin}  className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
                
                
                <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'> 
                    <input type='text'className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Email'required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <input type={show?"text":"password"}className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Password'required onChange={(e)=>setPassword(e.target.value)} value={password} />
                    {!show && <FaRegEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]'onClick={()=>setShow(prev => !prev)}/>}
                    {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]'onClick={()=>setShow(prev => !prev)}/>}
                    <button className='w-[100%] h-[50px] bg-[#6060f5] roundedlg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                    
                </div>
            </form>
          </div>
        </div>
  )
}

export default Login
