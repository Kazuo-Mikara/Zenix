import React from 'react'

const Loading = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin'></div>
        </div>
    )
}

export default Loading