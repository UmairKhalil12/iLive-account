import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import VoucherTable from "../../Components/VoucherTable/VoucherTable";
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar/Navbar';

export default function Voucher() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    
    return (
        <div>
            <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
                <Sidebar />
                <div className='container-1'>
                    <Navbar />
                    <SelectAdd accountType='Add Voucher' />
                    <VoucherTable />
                </div>
            </div>
        </div>
    )
}
