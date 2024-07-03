import React from 'react'
import "./Input.css"
import { useSelector } from 'react-redux';

export default function Input({ label, placeholder, onChange, value }) {
    const color = useSelector((state) => state.user.color);
    return (
        <div>
            <label className='label-form'>{label}*</label> <div className='space'></div>
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className='input-form'
                requireds
                style={color ? {} : { border: '0.5px solid var(--table-border-color)' } }
            />
        </div>
    )
}
