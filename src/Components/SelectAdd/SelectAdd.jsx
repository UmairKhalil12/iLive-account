import React, { useState } from 'react'
import './SelectAdd.css'
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import AddMainAccount from '../AddMainAccount/AddMainAccount';
import AddSubAccount from '../AddSubAccount/AddSubAccount';
import { useEffect } from 'react'
import { GET_METHOD } from '../../api/api';


export default function SelectAdd({ accountType , GroupId , mainAccountID , parentID }) {
    const [accounts, setAccounts] = useState([]);

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        setAccounts(res);
    }

    useEffect(() => {
        fetchAllAccounts();
    }, [accounts])

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(accounts);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='select-add'>
            <div className='select-arrow'>
                <select className='select-account'>
                    <option>Select Account</option>
                    {accounts.map((acc) => (
                        <option key={acc.ID} value={acc.ID}>{acc.GENERICID} -  {acc.NAME}</option>
                    ))}
                </select>
                <button className='arrow-btn' onClick={() => navigate(-1)} > &larr; </button>
            </div>

            <button className='add-account-btn' onClick={openModal}> <FiPlus /> {accountType} </button>

            {accountType === 'Add Sub Account' ? <AddSubAccount onClose={closeModal} isOpen={isModalOpen} title="Sub Account" GroupId={GroupId} /> :
                <AddMainAccount onClose={closeModal} isOpen={isModalOpen} title="Main Account" />
            }
        </div>
    )
}
