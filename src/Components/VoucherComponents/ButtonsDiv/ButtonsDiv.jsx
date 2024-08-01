import React from 'react';
import "./ButtonsDiv.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function ButtonsDiv({ onSubmit }) {
    const navigate = useNavigate();
    return (
        <div className='voucher-btn-div'>
            <button className='voucher-btn'>
                <IoMdSave size={15} className='icon-spacing' /> Draft
            </button>
            <button className='voucher-btn' onClick={onSubmit}>
                <TiTick size={15} className='icon-spacing' /> Post
            </button>
            <button className='voucher-btn' onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack size={15} className='icon-spacing' /> Back to Vouchers
            </button>
            <button className='voucher-btn' onClick={() => window.location.reload()}>
                <IoRefresh size={15} className='icon-spacing' /> Refresh Record
            </button>
        </div>
    );
}
