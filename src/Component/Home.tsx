import React, { useState } from 'react'

type Props = {}

export default function Home({}: Props) {
    const [Icon,setIcon] = useState(false);
    function handleToggle(){
      setIcon(!Icon)
    }
  return (
    <div className={`mt-10 h-screen w-full flex items-center justify-center ${Icon ? "bg-white" : "bg-black"}`}>
        <button
            onClick={handleToggle}
            className={`w-16 h-8 flex items-center rounded-full p-1  ${
            Icon ? "bg-green-500" : "bg-gray-300"
            }`}
        >
            {Icon && "ON"}
            <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                Icon ? "translate-x-2" : ""
            }`}
            ></div>
        </button>
  </div>
  )
}