import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title text1={'ABOUT'} text2={' US'}/>
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center '>
          <img src={about} alt=""  className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px] '>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            Vcart born for smart, seamless shopping-created to deliver quality product, trending styles, and everyday in one place. With reliable service, fast delivery, and great value, Vcart makes your online shopping experience simple, satisfying, and stress-free
          </p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]' >
            modern shoppers-combining style, convenience , and affordability. Whether it's fashion , essentials, or trends, we bring everything you need to one 
            trusted platform with fast delivery , easy return , and a customer-first shopping experience you'll love.
          </p>
          <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>Our Mission</p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            At VCart Shopping, we believe shopping should be simple, enjoyable, and rewarding. Our platform brings together the latest trends, high-quality products, and affordable prices—all in one place. From fashion to lifestyle, we aim to make every purchase convenient and trustworthy.

🎯 Our Mission

Our mission is to deliver a seamless online shopping experience where customers can explore, discover, and shop with confidence. We are committed to:

Offering a wide variety of products at the best value.

Ensuring secure and fast delivery to your doorstep.

Providing exceptional customer support whenever you need it.

Continuously improving with innovation and customer feedback.

At VCart, your happiness is our priority. ✨
          </p>
        </div>
      </div>
      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={'WHY'}  text2={' CHOOSE US'}/>
        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] '>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p>We guarantee quality through strict checks , reliable sourcing ,and a commitment to customer Satisfaction always.</p>
        
          </div>
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] '>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convenience</b>
            <p>Shop easily with fast delivery, simple navigation, secure checkout , and everything you need in one place.</p>
        
          </div>
          <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] backdrop-blur-[2px] bg-[#ffffff0b] '>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Exceptional Customer Services </b>
            <p>Our dedicated support team ensures quick response, helpful solution , and a smooth shooping experience every time.</p>
        
          </div>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About
