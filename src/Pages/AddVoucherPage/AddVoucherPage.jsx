import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import Sidebar from '../../Components/Navigation/Sidebar/Sidebar';
// import VoucherTable from '../../Components/VoucherTable/VoucherTable';

export default function AddVoucherPage() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    return (
        <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
            <Sidebar />
            <div className='container-1'>
                <Navbar />
                {/* <VoucherTable />  */}
            </div>
        </div>
    )
}
