import React from 'react'
import "./AccountType.css"

export default function AccountType({text}) {
  return (
    <div style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
      <p className='account-type' > {text}</p>
    </div>
  )
}
