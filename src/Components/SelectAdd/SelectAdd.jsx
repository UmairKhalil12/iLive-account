import React, { useState } from 'react'
import './SelectAdd.css'
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
// import Modal from '../Modal/Modal';
import AddMainAccount from '../AddMainAccount/AddMainAccount';
// import AddSubAccount from '../AddSubAccount/AddSubAccount';


export default function SelectAdd({ accountType }) {
    const accounts = [
        {
            id: 1,
            account: 'acc-1'
        },
        {
            id: 2,
            account: 'acc-2'
        },
        {
            id: 3,
            account: 'acc-3'
        },
        {
            id: 4,
            account: 'acc-4'
        }
    ];

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='select-add'>
            <div className='select-arrow'>
                <select className='select-account'>
                    {accounts.map((acc) => (
                        <option key={acc.id}>{acc.account}</option>
                    ))}
                </select>
                <button className='arrow-btn' onClick={() => navigate(-1)} > &larr; </button>
            </div>

            <button className='add-account-btn' onClick={openModal}> <FiPlus /> {accountType} </button>


            <AddMainAccount onClose={closeModal} isOpen={isModalOpen} title="Main Account" />

        </div>
    )
}
