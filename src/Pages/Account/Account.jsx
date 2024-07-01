import React from 'react';
import './Account.css';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';

export default function Account() {
    return (
        <div className='accounting-page'>
            <div className='container-1'>
                <Navbar />
                <SelectAdd accountType='Add Main Account' />
                <Table />
            </div>
        </div>
    );
}
