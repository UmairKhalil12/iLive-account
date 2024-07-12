import React, { useState } from 'react'
import './SelectAdd.css'
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import AddMainAccount from '../AddMainAccount/AddMainAccount';
import AddSubAccount from '../AddSubAccount/AddSubAccount';
import { useEffect } from 'react'
import { GET_METHOD } from '../../api/api';

export default function SelectAdd({ accountType, GroupId, mainAccountID, parentID, data }) {
    const [accounts, setAccounts] = useState([]);
    const [option, setOption] = useState([])

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        setAccounts(res);
    }

    useEffect(() => {
        fetchAllAccounts();
    }, [])

    const navigate = useNavigate();

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



    return (
        <>
            <div className='select-add'>
                <div className='select-arrow'>
                    <select className='select-account'>
                        <option>Select Account</option>
                        {accounts.map((acc) => (
                            <option key={acc.ID} value={acc.ID} onClick={() => handleOptionClick(acc.ID, acc.GENERICID, acc.ACCOUNTTYPE)}>{acc.GENERICID} -  {acc.NAME}</option>
                        ))}
                    </select>
                    <button className='arrow-btn' onClick={() => navigate(-1)} > &larr; </button>
                </div>

                <button className='add-account-btn' onClick={openModal}> <FiPlus /> {accountType} </button>

                {console.log('select add to add subaccount',data)}

                {accountType === 'Add Sub Account' ? <AddSubAccount onClose={closeModal} isOpen={isModalOpen} title="Sub Account" GroupId={GroupId} mainAccountID={mainAccountID} parentID={parentID} data={data} /> :
                    <AddMainAccount onClose={closeModal} isOpen={isModalOpen} title="Main Account" data={data} />
                }
            </div>
        </>
    )
}
