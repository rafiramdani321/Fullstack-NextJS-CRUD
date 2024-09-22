import React from 'react'

const alertError = ({message, isOpen}: {message: string[]; isOpen: boolean}) => {
  return (
     <div className={isOpen ? "modal-open" : "modal"}>
      <div className='p-5 bg-red-500 flex gap-2.5 rounded-md'>
           <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
           <div className='text-white'>
          {message && message.map((msg, index) => (
            <div key={index}>- {msg}</div> 
          ))}
        </div>
      </div>
        </div>
  )
}

export default alertError