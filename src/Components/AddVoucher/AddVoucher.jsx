import React from 'react'
import "./AddVoucher.css"
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from 'react-redux';

export default function AddVoucher() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    return (
        <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
            <Sidebar />
            <div className='container-1'>
                <Navbar />
                <div className='add-voucher'>
                    <h4>Add Payment Voucher </h4>
                    <div className='add-voucher-2'>
                        <div className='add-voucher-3'>
                            <div>
                                <label>Voucher No</label> <br /> <br />
                                <input placeholder='0' disabled />
                            </div>

                            <div>
                                <label>Date</label> <br /> <br />
                                <input type='date' />
                            </div>

                            <div>
                                <label>Status</label> <br /> <br />
                                <input placeholder='Select Status' disabled />
                            </div>
                        </div>

                        <div className='add-voucher-3'>
                            <div>
                                <label>Account Head</label> <br /> <br />
                                < select>
                                    <option>hello</option>
                                </select>
                            </div>

                            <div>
                                <label>Currency</label> <br /> <br />
                                <input type='text' placeholder='USD' disabled />
                            </div>

                            <div>
                                <label>Exchange Rate</label> <br /> <br />
                                <input placeholder='1' disabled />
                            </div>
                        </div>
                        <div>
                            <label >Particulars</label> <br /> <br/> 
                            <textarea className='particulars' placeholder='Particulars' />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
