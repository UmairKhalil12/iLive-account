import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import Table from "../../Components/Table/Table";
import { useSelector } from 'react-redux';

export default function FilterAccount() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    return (
        <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
            <Sidebar />
            <div className='container-1'>
                <Navbar />
                <SelectAdd accountType='Add Main Account' />
                <Table/>
            </div>
        </div>
    )
}
