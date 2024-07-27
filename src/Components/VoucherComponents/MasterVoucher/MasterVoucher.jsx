import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./MasterVoucher.css";
import { GET_METHOD } from '../../../api/api';

export default function MasterVoucher({ onDataChange }) {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const color = useSelector((state) => state.user.color);

    const [accounts, setAccounts] = useState([]);
    const [voucherNo, setVoucherNo] = useState("");
    const [voucherDate, setVoucherDate] = useState(""); // Initialize as empty string
    const [status, setStatus] = useState("");
    const [currency, setCurrency] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [particulars, setParticulars] = useState("");
    const [accountHead, setAccountHead] = useState("");
    const [accountGeneric, setAccountGeneric] = useState("");
    const [genericNo , setGenericNo] = useState(""); 

    // const [selectedAccountHead, setSelectedAccountHead] = useState([]);

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        setAccounts(res);
    };

    useEffect(() => {
        fetchAllAccounts();
    }, []);

    useEffect(() => {
        onDataChange({ voucherDate, currency, particulars, accountHead, accountGeneric , genericNo });
    }, [voucherDate, currency, particulars, accountHead, accountGeneric , genericNo]);

    const handleChange = (event) => {
        setAccountHead(event.target.value);
        const selectedOption = event.target.value;
        const selectedAccount = accounts.find(acc => acc.GUID === selectedOption);
        console.log('selectedAcc', selectedAccount);
        setAccountHead(selectedAccount?.ID);
        setCurrency(102);
        setAccountGeneric(selectedAccount?.GUID)
        setGenericNo(selectedAccount?.GENERICID);
    };

    return (
        <div className='add-voucher'>
            <h4>Add Payment Voucher </h4>
            <div className='add-voucher-2'>
                <div className='form-section'>
                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Voucher No</label>
                        <input
                            type='text'
                            placeholder='0'
                            disabled
                            value={voucherNo}
                            onChange={(e) => setVoucherNo(e.target.value)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Date</label>
                        <input
                            type='date'
                            value={voucherDate}
                            onChange={(e) => setVoucherDate(e.target.value)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Status</label>
                        <input
                            placeholder='1'
                            disabled
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>
                </div>

                <div className='form-section'>
                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Account Head</label>
                        <select
                            value={accountHead}
                            onChange={handleChange}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        >
                            <option value=''>Select Account</option>
                            {accounts?.map((acc) => (
                                <option key={acc.ID} value={acc.GUID}>
                                    {acc.GENERICID} - {acc.NAME}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Currency</label>
                        <input
                            type='text'
                            placeholder='USD'
                            disabled
                            value={currency}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Exchange Rate</label>
                        <input
                            placeholder='1'
                            disabled
                            value={exchangeRate}
                            onChange={(e) => setExchangeRate(e.target.value)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>
                </div>

                <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                    <label>Particulars</label>
                    <textarea
                        className='particulars'
                        placeholder='Particulars'
                        value={particulars}
                        onChange={(e) => setParticulars(e.target.value)}
                        style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                    />
                </div>
            </div>
        </div>
    );
}
