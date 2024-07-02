import React from 'react';
import './Account.css';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
// import { setExpandedMenu } from '../../store/slice';

export default function Account() {
    const expandedMenu = useSelector((state) => state.user.expandedMenu);
    

    return (
        <div className={expandedMenu === 1 || expandedMenu === 0 ? 'accountig-page-margin' : 'accounting-page'}  >
            <Sidebar />
            <div className='container-1'>
                <Navbar />
                <SelectAdd accountType='Add Main Account' />
                <Table />
            </div>
        </div>
    );
}
