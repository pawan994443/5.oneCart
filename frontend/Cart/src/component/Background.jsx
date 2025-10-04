import React from 'react'
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"
import back5 from "../assets/back5.jpg"

function Background({ heroCount }) {
  if (heroCount === 0) {
    return <img src={back2} alt="" className="float-right w-[50%] h-full object-contain pr-22" />
  } else if (heroCount === 1) {
    return <img src={back3} alt="" className="float-right w-[50%] h-full object-contain pr-22" />
  } else if (heroCount === 2) {
    return <img src={back4} alt="" className="float-right w-[50%] h-full object-contain pr-22" />
  } else if (heroCount === 3) {
    return <img src={back5} alt="" className="float-right w-[50%] h-full object-contain pr-22" />
  }
}

export default Background
