import React from 'react'
import "./AccountType.css"

export default function AccountType({text}) {
  return (
    <div>
      <p className='account-type' > {text}</p>
    </div>
  )
}
