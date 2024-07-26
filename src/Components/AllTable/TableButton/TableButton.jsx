import React from 'react'
import "./TableButton.css" 

export default function TableButton({ text, onClick , disabled }) {
    return (
        <button onClick={onClick} className='table-btn' disabled = {disabled}> {text} </button>
    )
}
