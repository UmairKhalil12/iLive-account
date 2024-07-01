import React from 'react'
import "./Input.css"

export default function Input({ label, placeholder, onChange, value }) {
    return (
        <div>
            <label>{label}</label> <br /> <br />
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className='input-form'
            />
        </div>
    )
}
