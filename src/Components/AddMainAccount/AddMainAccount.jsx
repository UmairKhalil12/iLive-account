import React, { useEffect, useState} from 'react';
import "./AddMainAccount.css";
import Input from '../Input/Input';
import { GET_METHOD } from '../../api/api';

const AddMainAccount = ({ isOpen, onClose, title }) => {
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState("");
    const [baseGroup, setBaseGroup] = useState("");
    const [positiveBalance, setPositiveBalance] = useState("");
    const [negativeBalance, setNegativeBalance] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isActive, setIsActive] = useState(false);

   
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

    const handleSubmit = async () => {
        await GET_METHOD(`/Api/AccountsApi/CreateMainAccount?Id=0&LocationId=1&CampusId=1&CompanyId=100&GroupId=${baseGroup}&MainAccountName=${accountName}&Remarks=${remarks}&BaseCurrency=${baseCurrency}&UserId=10131&IsActive=${isActive}&PositiveBalanceSymbol=${positiveBalance}&NegativeBalanceSymbol=${negativeBalance}`);
        onClose();
    };

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // console.log('group add main account', baseGroup)
    // console.log("Positive Balance" , positiveBalance)
    // console.log("Negative balance" , negativeBalance);
    // console.log("remarks" , remarks);
    // console.log("currency", currency);
    // console.log("base currency", baseCurrency);
    // console.log("isActive", isActive); 

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
                        <label className='label-form'>Group*</label>
                        <div className='space'></div>
                        <select className='select-group' value={baseGroup} onChange={(e) => setBaseGroup(e.target.value)}>
                            <option value="" disabled>Select Group</option>
                            {group?.map((gr) => (
                                <option key={gr.Id} value={gr.Id}>{gr.Description}</option>
                            ))}
                        </select>

                        <Input
                            label='Main Account Name'
                            placeholder="Main Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />

                        <label className='label-form'>Base Currency*</label>
                        <div className='space'></div>
                        <select className='select-currency' value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                            <option value="" disabled>Select Currency</option>
                            {currency?.map((curr) => (
                                <option key={curr.CurrencyId} value={curr.CurrencyId}>{curr.CurrencyCode}</option>
                            ))}
                        </select>

                        <Input
                            label="Positive Balance Symbol"
                            placeholder="DR/CR"
                            value={positiveBalance}
                            onChange={(e) => setPositiveBalance(e.target.value)}
                        />

                        <Input
                            label="Negative Balance Symbol"
                            placeholder="DR/CR"
                            value={negativeBalance}
                            onChange={(e) => setNegativeBalance(e.target.value)}
                        />

                        <label className='label-form'>Remarks*</label>
                        <div className='space'></div>
                        <textarea placeholder='Remarks' className='textarea' value={remarks} onChange={(e) => setRemarks(e.target.value)} />

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
                    <button className='save-btn' type='button' onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddMainAccount;
