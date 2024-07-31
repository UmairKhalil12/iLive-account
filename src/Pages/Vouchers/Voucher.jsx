import React from 'react'
import Sidebar from '../../Components/Navigation/Sidebar/Sidebar';
import SelectAdd from '../../Components/OtherComponents/SelectAdd/SelectAdd';
import VoucherTable from "../../Components/AllTable/VoucherTable/VoucherTable";
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar/Navbar';

export default function Voucher() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    
    return (
        <div>
            <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
                <Sidebar />
                <div className='container-1'>
                    <Navbar text='Cash Payment' />
                    <SelectAdd accountType='Add Voucher' />
                    <VoucherTable />
                </div>
            </div>
        </div>
    )
}
