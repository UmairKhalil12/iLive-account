import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import "./AddSubAccount.css";
import { GET_METHOD } from '../../api/api';

export default function AddSubAccount({ isOpen, onClose, title, GroupId, mainAccountID, parentID, data }) {
    const [currency, setCurrency] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState("");
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [selectedOption, setSelectedOption] = useState("Control Account"); // Default to Control Account
    const [isActive, setIsActive] = useState(false);
    const [baseGroup, setBaseGroup] = useState(GroupId || '');
    const [error, setError] = useState(""); // State variable for error message

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };

    useEffect(() => {
        const fetchCurrency = async () => {
            const res = await GET_METHOD('/Api/AccountsApi/GetCurrency');
            setCurrency(res);
        };

        const fetchGroup = async () => {
            const res = await GET_METHOD("/Api/AccountsApi/GetCustomData?Type=365");
            setGroup(res);
        };

        fetchCurrency();
        fetchGroup();
    }, []);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        const isControlAccount = selectedOption === 'Control Account';
        const isTransactional = selectedOption === 'Transaction Account';
        await GET_METHOD(`/Api/AccountsApi/CreateSubAccount?Id=0&LocationId=1&CampusId=1&CompanyId=100&GroupId=${GroupId}&SubAccountName=${accountName}&MainAccountId=${mainAccountID}&ParentId=${parentID}&IsControl=${isControlAccount}&IsTransactional=${isTransactional}&Remarks=${remarks}&UserId=10131&BaseCurrency=${baseCurrency}&IsActive=${isActive}`);
        onClose();
    };

    const handleAccountNameChange = (e) => {
        const newName = e.target.value;
        setAccountName(newName);

        // Check for duplicate sub-account name in a case-insensitive manner and ignoring extra spaces
        const isDuplicate = data.some(subAccount => subAccount.SubAccountName.trim().toLowerCase() === newName.trim().toLowerCase());
        if (isDuplicate) {
            setError("Sub Account Name already exists");
        } else {
            setError("");
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className='modal-title-btn'>
                    <p className="modal-title">{title}</p>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className='add-main-account'>
                    <form style={{ padding: '1rem' }}>
                        <label className='label-form'>Group*</label> <div className='space'></div>

                        <select className='select-group' value={baseGroup} onChange={(e) => setBaseGroup(e.target.value)}>
                            {
                                group.map((gr) => (
                                    <option key={`${GroupId} + ${gr.Description}`} value={GroupId} disabled>{gr.Description}</option>
                                ))
                            }
                        </select>

                        <Input
                            label='Sub Account Name'
                            placeholder="Sub Account Name"
                            value={accountName}
                            onChange={handleAccountNameChange}
                        />
                        {error && <p className="error-message">{error}</p>} {/* Display error message */}

                        <label className='label-form'>Base Currency*</label> <div className='space'></div>
                        <select className='select-currency' value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                            <option value="" disabled>Select Currency</option>
                            {currency?.map((curr) => (
                                <option key={curr.CurrencyId} value={curr.CurrencyId}>{curr.CurrencyCode}</option>
                            ))}
                        </select>

                        <label className='label-form'>Remarks*</label> <div className='space'></div>
                        <textarea placeholder='Remarks' className='textarea' value={remarks} onChange={(e) => { setRemarks(e.target.value) }} />

                        <br />

                        <div className='account-type_sub-account'>
                            <div className='check-subaccount-type'>
                                <input
                                    type="radio"
                                    id="controlaccount"
                                    name="accountType"
                                    value="Control Account"
                                    checked={selectedOption === 'Control Account'}
                                    onChange={handleChange}
                                    className='check-input'
                                />
                                <label htmlFor="controlaccount" className='label-form'>Control Account </label>
                            </div>

                            <div className='check-subaccount-type'>
                                <input
                                    type="radio"
                                    id="transactionaccount"
                                    name="accountType"
                                    value="Transaction Account"
                                    checked={selectedOption === 'Transaction Account'}
                                    onChange={handleChange}
                                    className='check-input'
                                />
                                <label htmlFor="transactionaccount" className='label-form'>Transaction Account</label>
                            </div>
                        </div>

                        <br />

                        <div className='is-active'>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={handleCheckboxChange}
                            />
                            &nbsp; &nbsp;
                            <label className='label-form'>Is Active</label>
                        </div>
                    </form>
                </div>

                <div className='cancel-save-btn'>
                    <button className='cancel-btn' onClick={onClose}>Cancel</button>
                    <button className='save-btn' type='button' onClick={handleSubmit} disabled={!!error}>Save</button>
                </div>
            </div>
        </div>
    )
}
