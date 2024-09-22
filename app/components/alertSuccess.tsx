import React from 'react'

const alertSuccess = ({message, isOpen}: {message: string; isOpen: boolean}) => {
  return (
     <div className={isOpen ? "modal-open" : "modal"}>
      <div className='p-5 w-64 bg-blue-500 flex gap-2.5 rounded-md'>
           <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current text-white"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
          <span className='text-white'>{message}</span>
        </div>
      </div>
  )
}

export default alertSuccess