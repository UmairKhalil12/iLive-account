import React from 'react';
import "./AddVoucher.css";
import Navbar from "../../Navigation/Navbar/Navbar";
import Sidebar from "../../Navigation/Sidebar/Sidebar";
import MasterVoucher from '../MasterVoucher/MasterVoucher';
import { useSelector } from 'react-redux';
import DetailVoucher from '../DetailVoucher/DetailVoucher';
import ButtonsDiv from '../ButtonsDiv/ButtonsDiv';

export default function AddVoucher() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    return (
        <div className={`accounting-page ${isSubmenuVisible ? 'accounting-page-margin' : ''}`}>
            <Sidebar />
            <div className='container-1'>
                <Navbar text='Cash Payment' />
                <ButtonsDiv /> <br /> <br /> 
                <MasterVoucher /> <br /> <br />
                <DetailVoucher />
            </div>
        </div>
    );
}
