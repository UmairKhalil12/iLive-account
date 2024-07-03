import React, { useState } from 'react'
import Input from '../Input/Input';
import "./AddSubAccount.css"


export default function AddSubAccount() {
    const [currency, setCurrency] = useState("");
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState("");
    const [remarks, setRemarks] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [isActive, setIsActive] = useState(false);


    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };

    return (
        <div className='add-main-account'>
            <form style={{ padding: '1rem' }}>
                <label className='label-form' >Group*</label> <div className='space'></div>

                <select className='select-group' value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
                </select>

                <Input
                    label='Sub Account Name'
                    placeholder="Sub Account Name"
                    value={accountName}
                    onChange={(e) => { setAccountName(e.target.value) }}
                />

                <label className='label-form' >Base Currency*</label>  <div className='space'></div>
                <select className='select-currency' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="" disabled selected>Select Currency</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
                </select>

                <label className='label-form' >Remarks*</label> <div className='space'></div>

                <textarea placeholder='Remarks' className='textarea' value={remarks} onChange={(e) => { setRemarks(e.target.value) }} />

                <br />

                <div className='account-type_sub-account'>
                    <div className='check-subaccount-type'>
                        <input
                            type="radio"
                            id="controlaccount"
                            name="options"
                            value="Control Account"
                            checked={selectedOption === 'Control Account'}
                            onChange={handleChange}
                            className='check-input'
                            defaultChecked
                        />
                        <label htmlFor="controlaccount" className='label-form'>Control Account </label>
                    </div>

                    <div className='check-subaccount-type'>
                        <input
                            type="radio"
                            id="transactionaccount"
                            name="transaction account"
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
            </form >
        </div>
    )
}
