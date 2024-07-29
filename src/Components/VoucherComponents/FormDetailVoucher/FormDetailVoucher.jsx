import React, { useEffect, useState } from 'react';
import './FormDetailVoucher.css';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../../api/api';
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

export default function FormDetailVoucher({ onDataChange, data }) {

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const color = useSelector((state) => state.user.color);

    // console.log('data Form detail voucher', data)

    const [accounts, setAccounts] = useState([]);
    const [fields, setFields] = useState([{ account: '', narration: '', credit: '', accountGenric: '', currency: '', selected: '' }]);

    const fetchAllAccounts = async () => {
        try {
            const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
            setAccounts(res);
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
        if(data){
            setFields(data);
        }
        
    }, []);

    const handleFieldChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...fields];
        updatedFields[index][name] = value;

        if (name === 'selected') {
            const selectedAccount = accounts.find(acc => acc.GUID === value);
            updatedFields[index]['account'] = selectedAccount?.ID || '';
            updatedFields[index]['currency'] = 102;
            updatedFields[index]['accountGenric'] = selectedAccount?.GUID || '';
        }

        setFields(updatedFields);
    };

    const addField = () => {
        setFields([...fields, { account: '', narration: '', credit: '', accountGenric: '', currency: '', selected: '' }]);
    };

    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    return (
        <div>
            {fields.map((field, index) => (
                <div key={index} className='form-detail-voucher'>
                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
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

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Narrations</label>
                        <input
                            type='text'
                            name='narration'
                            value={field.narration}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group'}>
                        <label>Amount</label>
                        <input
                            type='number'
                            name='credit'
                            value={field.credit}
                            onChange={(e) => handleFieldChange(index, e)}
                            style={color ? {} : { border: "0.5px solid var(--table-border-color)" }}
                        />
                    </div>

                    <div className={isSubmenuVisible ? 'form-group-margin' : 'form-group actions-group'}>
                        <label>Actions</label>
                        {field.account && field.narration && field.credit && (
                            <FaPlus className='btn-svg' onClick={addField} />
                        )}
                        {fields.length > 1 && (
                            <CiTrash className='btn-svg' onClick={() => removeField(index)} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
