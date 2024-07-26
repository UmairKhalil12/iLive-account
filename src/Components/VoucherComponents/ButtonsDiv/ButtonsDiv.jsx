import React from 'react';
import "./ButtonsDiv.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function ButtonsDiv() {
    const navigate = useNavigate();
    return (
        <div className='voucher-btn-div'>
            <button className='voucher-btn'>
                <IoMdSave size={15} className='icon-spacing' /> Draft
            </button>
            <button className='voucher-btn'>
                <TiTick size={15} className='icon-spacing' /> Post
            </button>
            <button className='voucher-btn'>
                <IoIosArrowRoundBack size={15} className='icon-spacing' onClick={navigate('/voucher')} /> Back to Vouchers
            </button>
            <button className='voucher-btn'>
                <IoRefresh size={15} className='icon-spacing' onClick={()=>window.location.reload()}  /> Refresh Record
            </button>
        </div>
    );
}
