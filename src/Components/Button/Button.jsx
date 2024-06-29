import React from 'react'
import "./Button.css"

export default function Button({ text, onClick, logo }) {
    return (
        <div className='outlined-btn' onClick={onClick}>
            {logo}
            <p>{text}</p>

        </div>
    )
}
