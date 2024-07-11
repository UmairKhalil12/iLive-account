import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../api/api';
import { useParams } from 'react-router-dom';

export default function SubAccount() {
    const { mainAccountID, parentID,GroupId } = useParams(); // Get route parameters
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        if (mainAccountID && parentID) {
            const res = await GET_METHOD(`/Api/AccountsApi/GetSubAccounts?LocationId=1&CampusId=1&ParentId=${parentID}&MainAccountId=${mainAccountID}`);
            setData(res);
            console.log(data , 'sub-account')
        }
    }, [mainAccountID, parentID , data]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
            <Sidebar />
            <div className='container-1'>
                <Navbar />
                <SelectAdd accountType='Add Sub Account' GroupId = {GroupId}  mainAccountID={mainAccountID} parentID={parentID}  />
                <Table data={data} />
            </div>
        </div>
    );
}

