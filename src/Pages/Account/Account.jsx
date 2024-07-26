import React, { useCallback, useEffect, useState } from 'react';
import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import Table from '../../Components/AllTable/Table/Table';
import SelectAdd from '../../Components/OtherComponents/SelectAdd/SelectAdd';
import Sidebar from '../../Components/Navigation/Sidebar/Sidebar';
import { GET_METHOD } from '../../api/api';
import Loader from "../../Components/OtherComponents/Loader/Loader";
import { setData } from '../../store/slice';

export default function Account() {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await GET_METHOD('/Api/AccountsApi/GetMainAccounts?LocationId=1&CampusId=1');
            dispatch(setData(res));
            console.log('account',res);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleUpdate = async() =>{
        const res = await GET_METHOD('/Api/AccountsApi/GetMainAccounts?LocationId=1&CampusId=1');
        dispatch(setData(res));
    }

 
    return (
        <>
            {loading ? <Loader /> : (
                <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
                    <Sidebar />
                    <div className='container-1'>
                        <Navbar  />
                        <SelectAdd accountType='Add Main Account'/>
                        <Table onUpdate={handleUpdate}/>
                    </div>
                </div>
            )}
        </>
    );
}
