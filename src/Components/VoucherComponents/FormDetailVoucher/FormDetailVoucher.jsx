import React, { useEffect, useState } from 'react';
import './FormDetailVoucher.css';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../../api/api';
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

export default function FormDetailVoucher({ onDataChange, data, JournalVoucher }) {

    console.log(JournalVoucher, 'formdetailvoucherfomr')

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const color = useSelector((state) => state.user.color);

    // console.log('data Form detail voucher', data)

    const [accounts, setAccounts] = useState([]);

    const initialField = JournalVoucher
        ? { account: '', narration: '', credit: '', debit: '', accountGenric: '', currency: '', selected: '', updatingId: null }
        : { account: '', narration: '', credit: '', accountGenric: '', currency: '', selected: '', updatingId: null };

    const [fields, setFields] = useState([initialField]);

    const fetchAllAccounts = async () => {
        try {
            const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
            if (res == null) {
                setAccounts([{ ID: 12, NAME: 'hello', GENERICID: 'abc-01', GUID: 'guid-01s' }])
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
        onDataChange(fields);
        console.log(fields);
    }, [fields, onDataChange]);

    useEffect(() => {
        if (data) {
            setFields(data);
        }

    }, []);

    const handleFieldChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...fields];
        updatedFields[index][name] = value;

        if (name === 'selected') {
            const selectedAccount = accounts.find(acc => acc.GUID === value);
            updatedFields[index]['account'] = selectedAccount?.ID;
            updatedFields[index]['currency'] = 102;
            updatedFields[index]['accountGenric'] = selectedAccount?.GENERICID;
        }

        setFields(updatedFields);
        console.log(fields[index].account);
    };

    const addField = () => {
        setFields([...fields, initialField]);
    };

    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const JournalClassName = JournalVoucher ? 'form-group-journal ' : 'form-group'
    const JournalClassNameMargin = JournalVoucher ? 'form-group-journal-margin' : 'form-group-margin'

    return (
        <div>
            {fields.map((field, index) => (
                <div key={index} className='form-detail-voucher'>
                    <div className={isSubmenuVisible ? JournalClassNameMargin : JournalClassName}>
                        <label>Account</label>
                        <select
                            name='selected'
                            value={field.selected}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        >
                            <option value=''>Select Account</option>
                            {accounts.map((acc) => (
                                <option key={acc.ID} value={acc.GUID}>
                                    {acc.GENERICID} - {acc.NAME}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={isSubmenuVisible ? JournalClassNameMargin : JournalClassName}>
                        <label>Narrations</label>
                        <input
                            type='text'
                            name='narration'
                            value={field.narration}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? JournalClassNameMargin : JournalClassName}>
                        <label>{JournalVoucher ? 'Credit' : 'Amount'}</label>
                        <input
                            type='number'
                            name='credit'
                            value={field.credit}
                            disabled={field.debit > 0}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    {JournalVoucher ? <div className={isSubmenuVisible ? JournalClassNameMargin : JournalClassName}>
                        <label>Debit</label>
                        <input
                            type='number'
                            name='debit'
                            value={field.debit}
                            disabled={field.credit > 0}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div> : null}

                    <div className={isSubmenuVisible ? JournalClassNameMargin : 'form-group actions-group'}>
                        <label>Actions</label>
                        <div className='action-btns'>
                            {JournalVoucher ? field.account && field.narration && (field.credit || field.debit) && (
                                <FaPlus className='btn-svg' onClick={addField} />
                            ) :
                                field.account && field.narration && field.credit && (
                                    <FaPlus className='btn-svg' onClick={addField} />
                                )
                            }

                            {fields.length > 1 && (
                                <CiTrash className='btn-svg' onClick={() => removeField(index)} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
