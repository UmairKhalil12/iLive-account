import React, { useEffect, useState } from 'react';
import './FormDetailVoucher.css';
import { useSelector } from 'react-redux';
import { GET_METHOD } from '../../../api/api';
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

export default function FormDetailVoucher({ onDataChange }) {

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);
    const [accounts, setAccounts] = useState([]);
    const [fields, setFields] = useState([{ account: '', narration: '', credit: '', accountGenric: '', currency: '', selected: '' }]);
    const color = useSelector((state) => state.user.color);

    const fetchAllAccounts = async () => {
        const res = await GET_METHOD('/Api/AccountsApi/getAllAccounts?LocationId=1&CampusId=1');
        setAccounts(res);
    };

    useEffect(() => {
        fetchAllAccounts();
    }, []);

    useEffect(() => {
        onDataChange(fields);
    }, [fields]);

    const handleFieldChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = [...fields];
        newFields[index][name] = value;

        if (name === 'selected') {
            const selectedAccount = accounts.find(acc => acc.GUID === value);
            newFields[index]['account'] = selectedAccount?.ID;
            newFields[index]['currency'] = 102;
            newFields[index]['accountGenric'] = selectedAccount?.GUID;
        }

        setFields(newFields);
    };

    const addField = () => {
        setFields([...fields, { account: '', narration: '', credit: '', accountGenric: '', currency: '', selected: '' }]);
    };

    const removeField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
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
                            {accounts?.map((acc) => (
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
                        {field.account && field.narration && field.credit && <FaPlus className='btn-svg' onClick={addField} />}
                        {index > 0 && <CiTrash className='btn-svg' onClick={() => removeField(index)} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
