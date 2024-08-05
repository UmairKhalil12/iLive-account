import React, { useEffect, useState } from 'react';
import './FormDetailVoucher.css';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../../api/api';
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

export default function FormDetailVoucher({ onDataChange, data, JournalVoucher, RecSourceId }) {

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const color = useSelector((state) => state.user.color);

    const [accounts, setAccounts] = useState([]);

    const initialField = JournalVoucher === true
        ? { account: '', narration: '', credit: 0, debit: 0, accountGenric: '', currency: '', selected: '', updatingId: 0 }
        : { account: '', narration: '', credit: 0, accountGenric: '', currency: '', selected: '', updatingId: 0 };

    const [fields, setFields] = useState([initialField]);

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
        onDataChange(fields);
    }, [fields, onDataChange]);

    useEffect(() => {
        if (data) {
            setFields(data);
        }
        console.log(fields)

    }, []);

    const handleFieldChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...fields];

        if (name === 'narration') {
            updatedFields[index][name] = value;
        }

        if (name === 'selected') {
            const selectedAccount = accounts.find(acc => acc.GUID === value);
            updatedFields[index]['account'] = selectedAccount?.ID || '';
            updatedFields[index]['accountGenric'] = selectedAccount?.GENERICID || '';
            updatedFields[index]['currency'] = 102;
            updatedFields[index]['selected'] = value;
        }

        if (JournalVoucher) {
            if (name == 'credit' || name == 'debit') {
                updatedFields[index][name] = value === '' ? '' : Number(value);
            }
        }
        else {
            if (name === 'credit') {
                updatedFields[index][name] = value === '' ? '' : Number(value);
            }
            else if (name === 'debit') {
                updatedFields[index][name] = value === '' ? '' : Number(value);
            }
            else {
                updatedFields[index][name] = value;
            }

        }

        // Update state
        setFields(updatedFields);
        console.log('formDetail', fields);
    };

    const addField = () => {
        setFields([...fields, initialField]);
    };

    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const JournalClassName = JournalVoucher ? 'form-group-journal ' : 'form-group';
    const JournalClassNameMargin = JournalVoucher ? 'form-group-journal-margin' : 'form-group-margin';

    const renderAmountValue = (field) => {
        if (JournalVoucher) {
            return field.credit;
        }
        if (RecSourceId == 371 || RecSourceId == 373) {
            return field.debit;
        }
        if (RecSourceId == 372 || RecSourceId == 374) {
            return field.credit;
        }
    };

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
                            name={RecSourceId == 371 || RecSourceId == 373 ? 'debit' : 'credit'}
                            value={renderAmountValue(field)}
                            disabled={JournalVoucher ? field.debit > 0 : false}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    {JournalVoucher && (
                        <div className={isSubmenuVisible ? JournalClassNameMargin : JournalClassName}>
                            <label>Debit</label>
                            <input
                                type='number'
                                name='debit'
                                value={field.debit}
                                disabled={JournalVoucher ? field.credit > 0 : false}
                                onChange={(e) => handleFieldChange(index, e)}
                                style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                            />
                        </div>
                    )}

                    <div className={isSubmenuVisible ? JournalClassNameMargin : 'form-group actions-group'}>
                        <label>Actions</label>
                        <div className='action-btns'>
                            {JournalVoucher ? field.account && field.narration && (field.credit || field.debit) && (
                                <FaPlus className='btn-svg' onClick={addField} />
                            ) : field.account && field.narration && (field.credit || field.debit) && (
                                <FaPlus className='btn-svg' onClick={addField} />
                            )}

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
