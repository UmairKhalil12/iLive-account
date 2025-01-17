import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./MasterVoucher.css";
import { GET_METHOD } from '../../../api/api';

export default function MasterVoucher({ onDataChange, data, JournalVoucher }) {
    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const color = useSelector((state) => state.user.color);

    const [accounts, setAccounts] = useState([]);

    const [voucherDate, setVoucherDate] = useState("");
    const [currency, setCurrency] = useState(102);
    const [particulars, setParticulars] = useState("");
    const [accountHead, setAccountHead] = useState("");
    const [accountId, setAccountId] = useState(0);
    const [accountGeneric, setAccountGeneric] = useState("");
    // const [genericNo, setGenericNo] = useState("");

    // console.log('masterVoucher', JournalVoucher);

    const fetchAllAccounts = async () => {
        try {
            const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
            if (res == null) {
                setAccounts([
                    { ID: 12, NAME: 'hello', GENERICID: 'abc-01', GUID: 'guid-01' },
                    { ID: 13, NAME: 'hello1', GENERICID: 'abc-02', GUID: 'guid-02' },
                    { ID: 14, NAME: 'hello2', GENERICID: 'abc-03', GUID: 'guid-03' },
                    { ID: 15, NAME: 'hello3', GENERICID: 'abc-04', GUID: 'guid-04' },
                    { ID: 16, NAME: 'hello4', GENERICID: 'abc-05', GUID: 'guid-05' },
                    { ID: 17, NAME: 'hello5', GENERICID: 'abc-06', GUID: 'guid-06' }
                ]);
            }
            else {
                setAccounts(res);
            }

        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchAllAccounts();
    }, []);

    useEffect(() => {
        if (data) {
            console.log('data updt MV', data);
            // console.log(data.AccountGenricNo, data.voucherDate, data.CurrencyId, data.AccountId, data.particulars);
            setAccountHead(data?.accountGeneric);
            setVoucherDate(data.voucherDate?.split('T')[0]);
            setParticulars(data?.particulars);
            setAccountId(data?.accountId);
            setAccountGeneric(data?.accountGeneric);
            setCurrency(data?.currency);

        }
    }, []);

    useEffect(() => {
        onDataChange({ voucherDate, currency, particulars, accountId, accountGeneric, accountHead });
        console.log('update checking', { accountId, accountGeneric, voucherDate, currency, particulars });

    }, [voucherDate, currency, particulars, accountId, accountGeneric, accountHead]);



    const handleChange = (event) => {
        const selectedOption = event.target.value;
        const selectedAccount = accounts.find(acc => acc.GUID === selectedOption);
        setAccountHead(selectedOption);
        setAccountId(selectedAccount?.ID);
        setCurrency(102);
        setAccountGeneric(selectedAccount?.GUID);
        // setGenericNo(selectedAccount?.GENERICID);
    };

    const className = JournalVoucher ? 'form-group-journal-master' : 'form-group';
    const marginClassName = JournalVoucher ? 'form-group-journal-master-margin' : 'form-group-margin';

    return (
        <div className='add-voucher'>
            <h4>Add Payment Voucher</h4>
            <div className='add-voucher-2'>
                <div className='form-section'>
                    <div className={isSubmenuVisible ? marginClassName : className}>
                        <label>Voucher No</label>
                        <input
                            type='text'
                            placeholder='0'
                            disabled
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? marginClassName : className}>
                        <label>Date</label>
                        <input
                            type='date'
                            value={voucherDate}
                            onChange={(e) => setVoucherDate(e.target.value)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? marginClassName : className}>
                        <label>Status</label>
                        <input
                            placeholder='1'
                            disabled
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    {JournalVoucher ?
                        <div className={isSubmenuVisible ? marginClassName : className}>
                            <label>Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => { setCurrency(e.target.value) }}
                                style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                            >
                                <option value=''>Currency</option>
                                <option key={102} value={102}>USD</option>
                                <option key={101} value={101}>PKR</option>
                            </select>
                        </div> : null
                    }

                </div>

                <div className='form-section'>
                    {JournalVoucher ? null :
                        <div className={isSubmenuVisible ? marginClassName : className}>
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
                    }
                    {JournalVoucher ? null :
                        <div className={isSubmenuVisible ? marginClassName : className}>
                            <label>Currency</label>
                            <input
                                type='text'
                                placeholder='USD'
                                disabled
                                value={currency}
                                style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                            />
                        </div>
                    }

                    {JournalVoucher ? null :
                        <div className={isSubmenuVisible ? marginClassName : className}>
                            <label>Exchange Rate</label>
                            <input
                                placeholder='1'
                                disabled
                                style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                            />
                        </div>
                    }

                </div>

                <div >
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
