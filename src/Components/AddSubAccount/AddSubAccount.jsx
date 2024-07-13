import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import "./AddSubAccount.css";
import { GET_METHOD } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/slice';

export default function AddSubAccount({ isOpen, onClose, title, GroupId, mainAccountID, parentID, update }) {
    const [currency, setCurrency] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState("");
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [selectedOption, setSelectedOption] = useState("Control Account");
    const [isActive, setIsActive] = useState(false);
    const [baseGroup, setBaseGroup] = useState(GroupId || '');
    const [error, setError] = useState("");
    const [formError, setFormError] = useState(false);

    const data = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

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

    const getDataOnUpdate = async () => {
        const res = await GET_METHOD(`/Api/AccountsApi/GetSubAccounts?LocationId=1&CampusId=1&ParentId=${parentID}&MainAccountId=${mainAccountID}`);
        dispatch(setData(res));
        console.log(res);
    }

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

    useEffect(() => {
        if (update) {
            console.log(parentID);
            const editData = data.find((d) => d.SubAccountId === parentID)
            setAccountName(editData?.SubAccountName || "");
            setBaseCurrency(editData?.BaseCurrency || "");
            setBaseGroup(editData?.GroupId || "");
            setRemarks(editData?.Remarks || "");
            setIsActive(editData?.IsActive || false);
        }
    }, [data, parentID, update]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        const isControlAccount = selectedOption === 'Control Account';
        const isTransactional = selectedOption === 'Transaction Account';
        if (update) {
            await GET_METHOD(`/Api/AccountsApi/CreateSubAccount?Id=${parentID}&LocationId=1&CampusId=1&CompanyId=100&GroupId=${GroupId}&SubAccountName=${accountName}&MainAccountId=${mainAccountID}&ParentId=${parentID}&IsControl=${isControlAccount}&IsTransactional=${isTransactional}&Remarks=${remarks}&UserId=10131&BaseCurrency=${baseCurrency}&IsActive=${isActive}`);
            getDataOnUpdate();
            setAccountName("");
            setBaseCurrency("");
            setRemarks("");
            setIsActive("");
        }
        else {
            await GET_METHOD(`/Api/AccountsApi/CreateSubAccount?Id=0&LocationId=1&CampusId=1&CompanyId=100&GroupId=${GroupId}&SubAccountName=${accountName}&MainAccountId=${mainAccountID}&ParentId=${parentID}&IsControl=${isControlAccount}&IsTransactional=${isTransactional}&Remarks=${remarks}&UserId=10131&BaseCurrency=${baseCurrency}&IsActive=${isActive}`);
            getDataOnUpdate();
            setAccountName("");
            setRemarks("");
            setBaseCurrency("");
            setIsActive("");
        }

        onClose();
    };

    const handleAccountNameChange = (e) => {
        const newName = e.target.value;
        setAccountName(newName);
        const isDuplicate = data.some(subAccount => subAccount.SubAccountName.trim().toLowerCase() === newName.trim().toLowerCase());
        if (isDuplicate) {
            setError("Sub Account Name already exists");
        } else {
            setError("");
        }
    };

    const handleForm = () => {
        console.log('handleform sub account');
        if (baseCurrency === '' || accountName === '' || remarks === '') {
            setFormError(true);
        } else {
            setFormError(false);
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
                    <form style={{ padding: '1rem' }} onChange={handleForm}>
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
                    <button className='save-btn' type='button' onClick={handleSubmit} disabled={!!error || formError}>Save</button>
                </div>
            </div>
        </div>
    )
}
