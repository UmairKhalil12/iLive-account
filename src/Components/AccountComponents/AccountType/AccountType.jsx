import React from 'react'
import "./AccountType.css"

export default function AccountType({ text }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p className='account-type' style={text === 'Control' ? { backgroundColor: 'var(--main-green-color)' } : { backgroundColor: '#E62965' }} > {text}</p>
    </div>
  )
}
