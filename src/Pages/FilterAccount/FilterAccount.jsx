import React from 'react'
import Sidebar from '../../Components/Navigation/Sidebar/Sidebar';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import SelectAdd from '../../Components/OtherComponents/SelectAdd/SelectAdd';
import Table from "../../Components/AllTable/Table/Table";
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
