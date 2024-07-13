import React, { useState } from 'react'
import './SelectAdd.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import AddMainAccount from '../AddMainAccount/AddMainAccount';
import AddSubAccount from '../AddSubAccount/AddSubAccount';
import { useEffect } from 'react'
import { GET_METHOD } from '../../api/api';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import Breadcrumb from '../BreadCrumb/BreadCrumb';


export default function SelectAdd({ accountType, GroupId, mainAccountID, parentID }) {
    const [accounts, setAccounts] = useState([]);
    const [option, setOption] = useState([]);
    const [tree, setTree] = useState([]);
    const [disable, setDisable] = useState(false);

    const data = useSelector((state) => state.user.data);
    const name = data.find((d) =>
        d.MainAccountId == mainAccountID
    )
    const n = name?.MainAccountName;
    console.log('name', n);


    const [path, setPath] = useState([{ name: n, link: '/' }]);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        setAccounts(res);
    }

    useEffect(() => {
        fetchAllAccounts();
    }, [])



    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOptionClick = async (id, generic_id, accountType) => {
        try {
            const res = await GET_METHOD(`/Api/AccountsApi/getAccountsByFilter?Generic=${generic_id}&Type=${accountType}&LocationId=1&CampusId=1`);
            setOption(res);
            console.log('selectAdd', option);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleTree = () => {
        console.log(parentID);
        data.forEach((d) => {
            console.log(d?.ParentId)
        })
        const d = data.find((d) => d.ParentId == parentID);
        setTree(DOMPurify.sanitize(d?.TreeHTML));
    }

    useEffect(() => {
        if (location.pathname === '/') {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, []);

    useEffect(() => {
        const currentPath = location.pathname.split('/').filter(Boolean);
        const newPath = currentPath.map((crumb, index) => ({
            name: data.find((d) => d.ParentId == parentID)?.SubAccountName,
            // name: crumb.charAt(0).toUpperCase() + crumb.slice(1),
            // link: '/' + currentPath.slice(0, index + 1).join('/')
        }));
        setPath([{ name: n, link: '/' }, ...newPath]);
    }, [location.pathname]);



    return (
        <>
            {/* <Breadcrumb path={path} /> */}
            <div className='select-add'>
                <div className='select-arrow'>
                    <select className='select-account'>
                        <option>Select Account</option>
                        {accounts.map((acc) => (
                            <option key={acc.ID} value={acc.ID} onClick={() => handleOptionClick(acc.ID, acc.GENERICID, acc.ACCOUNTTYPE)}>{acc.GENERICID} -  {acc.NAME}</option>
                        ))}
                    </select>
                    <button className='arrow-btn' onClick={() => navigate(-1)} disabled={disable} > &larr; </button>
                </div>

                <button className='add-account-btn' onClick={openModal}> <FiPlus /> {accountType} </button>

                {console.log('select add to add subaccount', data)}

                {accountType === 'Add Sub Account' ? <AddSubAccount onClose={closeModal} isOpen={isModalOpen} title="Sub Account" GroupId={GroupId} mainAccountID={mainAccountID} parentID={parentID} data={data} /> :
                    <AddMainAccount onClose={closeModal} isOpen={isModalOpen} title="Main Account" data={data} />
                }
            </div>
        </>
    )
}
