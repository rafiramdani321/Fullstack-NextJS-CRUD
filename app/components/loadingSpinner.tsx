import React from 'react'

const loadingSpinner = () => {
  return (
  <>
      {/* Layer gelap di belakang */}
      <div className='fixed inset-0 bg-black opacity-50 z-[98]'></div>
      <div className='absolute z-[99] flex justify-center items-center inset-0'>
        <span className="loading loading-spinner text-primary size-10"></span>
      </div>
    </>
  )
}

export default loadingSpinner