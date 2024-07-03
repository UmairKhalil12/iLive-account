import React, { useState } from 'react'
import "./AddMainAccount.css"
import Input from '../Input/Input'

export default function AddMainAccount() {
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState("");
    const [currency, setCurrency] = useState("");
    const [positiveBalance, setPositiveBalance] = useState("");
    const [negativeBalance, setNegativeBalance] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isActive, setIsActive] = useState(false);


    const handleCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };
    return (
        <div className='add-main-account'>
            <form style={{ padding: '1rem' }}>
                <label className='label-form' >Group*</label> <div className='space'></div>

                <select className='select-group' value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option value="" disabled selected>Select Group</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
                </select>

                <Input
                    label='Main Account Name'
                    placeholder="Main Account Name"
                    value={accountName}
                    onChange={(e) => { setAccountName(e.target.value) }}
                />

                <label className='label-form' >Base Currency*</label>  <div className='space'></div>
                <select className='select-currency' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="" disabled selected>Select Currency</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
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


                <label className='label-form' >Remarks*</label> <div className='space'></div>

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
            </form >
        </div>

    )
}
