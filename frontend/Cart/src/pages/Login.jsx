import React, { useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { FaRegEye } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from 'react';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Login() {
  let [show,setShow] = useState(false);
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let {serverUrl} = useContext(authDataContext)
  let {getCurrentUser} = useContext(userDataContext)
  let navigate =useNavigate()
  

    const handleLogin = async (e) => {
        
        
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/Login',{
                email,password 
            },{withCredentials:true})
            console.log(result.data)
            toast.success(" Login Successfully")
            getCurrentUser()
            navigate("/")

            

        } catch (error) {
            console.log(error)
            
            toast.error("Login Failed")

        }
    }
    //  const googleSignup = async () =>{
    //         try {
    //             const response = await signInWithPopup(auth, provider)
    //             console.log(response)
    
    //         } catch (error) {
    //                console.log(error)
    
    //         }
    //     }
           const googleLogin = async () =>{
            
            
                try {
                    const response = await signInWithPopup(auth, provider)
                    let user = response.user
                    let name = user.displayName;
                    let email = user.email 
        
                    const result = await axios.post(serverUrl + "/api/auth/googleLogin",{name,email}, {withCredentials:true})
                    console.log(result.data)
                    toast.success("Login Successfully")
                     getCurrentUser()
                    navigate("/")
                   
        
                } catch (error) {
                    console.log(error)
                    
                    toast.error("Login Failed")
        
                }
            }


  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[88px] flex items-center justify-start px-[30] gap-[8px] curse-pointer' onClick={()=>navigate("/")}>
      <img className='w-[40px]' src={Logo} alt="" />
      <h1 className='text-[22px] font-sans'>VCart</h1>
      </div>
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login</span>
        <span className='text-[16px]'>Welcome to Vcart, Place your Order</span>

      </div>
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] '>
            <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
                <img src={google} alt="" className='w-[20px]'/> Login account with Google
            </div>
            <div className='w-[100%] h-[20px] flex items-center justify-center agp[10px]'>
                <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'> 
                <input type='text'className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Email'required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type={show?"text":"password"}className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'placeholder='Password'required onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!show && <FaRegEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]'onClick={()=>setShow(prev => !prev)}/>}
                {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]'onClick={()=>setShow(prev => !prev)}/>}
                <button className='w-[100%] h-[50px] bg-[#6060f5] roundedlg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                <p className='flex gap-[10px]'>You haven't any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'onClick={()=>navigate("/signup")}> Create New Account</span></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
