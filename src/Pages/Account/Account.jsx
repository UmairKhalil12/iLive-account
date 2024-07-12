import React, { useCallback, useEffect, useState } from 'react';
import './Account.css';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../api/api';
import Loader from "../../Components/Loader/Loader";

export default function Account() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await GET_METHOD('/Api/AccountsApi/GetMainAccounts?LocationId=1&CampusId=1');
            setData(res);
            console.log(res);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);


    return (
        <>
            {loading ? <Loader /> : (
                <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
                    <Sidebar />
                    <div className='container-1'>
                        <Navbar />
                        <SelectAdd accountType='Add Main Account' data={data} />
                        <Table data={data} />
                    </div>
                </div>
            )}
        </>
    );
}
