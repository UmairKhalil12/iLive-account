import React from 'react'
import "./ActionButton.css"


export default function ActionButton({ onClick, text }) {
    return (
        <button onClick={onClick} className='action-btn'>{text}</button>
    )
}
