import React from 'react'

const index = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} name={props.name} className='w-full rounded-md h-5 p-5 border'/>
  )
}

export default index