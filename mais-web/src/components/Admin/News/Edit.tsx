import React from 'react'
import Editor from './Editor'
import Sidebar from './Sidebar'

const Edit = () => {
  return (
    <>
      <div className='w-full h-full flex flex-row'>
        <div className='w-1/4 h-full bg-gray-200'>
          <Sidebar />
        </div>
        <div className='w-3/4 h-full bg-white'>
          <Editor />
        </div>
      </div>
    </>
  )
}

export default Edit