import React, { useState, useEffect } from 'react';
import './SelectAdd.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import AddMainAccount from '../../Form/AddMainAccount/AddMainAccount';
import AddSubAccount from '../../Form/AddSubAccount/AddSubAccount';
import { GET_METHOD } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../../store/slice';

export default function SelectAdd({ accountType, GroupId, mainAccountID, parentID }) {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector((state) => state.user.data);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        console.log('select add', res); 
        setAccounts(res);
    };

    useEffect(() => {
        fetchAllAccounts();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        const selectedAccount = accounts.find(acc => acc.GUID === selectedOption);
        if (selectedAccount) {
            handleOptionClick(selectedAccount.GUID, selectedAccount.TYPE);
        }
    };

    const handleOptionClick = async (guid, type) => {
        try {
            const res = await GET_METHOD(`/Api/AccountsApi/getAccountsByFilter?Generic=${guid}&Type=${type}&LocationId=1&CampusId=1`);
            dispatch(setData(res));
            navigate(`/filter/${guid}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        setDisable(location.pathname === '/');
    }, [location.pathname]);

    return (
        <>
            <div className='select-add'>
                <div className='select-arrow'>
                    <select className={ accountType === 'Add Voucher' ? 'select-account-disable' : 'select-account'} onChange={handleChange}  >
                        <option value=''>Select Account</option>
                        {accounts?.map((acc) => (
                            <option key={acc.ID} value={acc.ID}>
                                {acc.GENERICID} - {acc.NAME}
                            </option>
                        ))}
                    </select>
                    <button className='arrow-btn' onClick={() => navigate(-1)} disabled={disable}>&larr;</button>
                </div>

                <button className='add-account-btn' onClick= { accountType === 'Add Voucher' ? ()=>navigate("/AddVoucher") : openModal}><FiPlus /> {accountType}</button>

                {accountType === 'Add Sub Account' ?
                    <AddSubAccount
                        onClose={closeModal}
                        isOpen={isModalOpen}
                        title="Sub Account"
                        GroupId={GroupId}
                        mainAccountID={mainAccountID}
                        parentID={parentID}
                        data={data}
                    /> :
                    <AddMainAccount
                        onClose={closeModal}
                        isOpen={isModalOpen}
                        title="Main Account"
                        data={data}
                    />
                }
            </div>
        </>
    );
}
