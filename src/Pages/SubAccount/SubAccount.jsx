import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Table from '../../Components/Table/Table';
import SelectAdd from '../../Components/SelectAdd/SelectAdd';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../api/api';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

export default function SubAccount() {
    const { mainAccountID, parentID, GroupId } = useParams();
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [tree , setTree] = useState("");

    const getData = async () => {
        setLoading(true);
        try {
            if (mainAccountID && parentID) {
                console.log('Fetching sub account data with MainAccountID:', mainAccountID, 'and ParentID:', parentID);
                const res = await GET_METHOD(`/Api/AccountsApi/GetSubAccounts?LocationId=1&CampusId=1&ParentId=${parentID}&MainAccountId=${mainAccountID}`);
                setData(res);
                console.log("Fetched sub account data:", data);

            }
        } catch (error) {
            console.log("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getData();

    }, [mainAccountID, parentID]);

    console.log("Fetched sub account data:", data);


    return (
        <>
            {loading ? <Loader /> : (
                <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
                    <Sidebar />
                    <div className='container-1'>
                        <Navbar />
                        <SelectAdd accountType='Add Sub Account' GroupId={GroupId} mainAccountID={mainAccountID} parentID={parentID} data={data} />
                        <Table data={data} />
                    </div>
                </div>
            )}
        </>
    );
}
