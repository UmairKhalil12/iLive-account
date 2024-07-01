import React, { useState } from 'react'
import "./AddMainAccount.css"
import Input from '../Input/Input'

export default function AddMainAccount() {
    const [accountName, setAccountName] = useState("");
    const [group, setGroup] = useState("");
    const [currency, setCurrency] = useState("");
    const [positiveBalance, setPositiveBalance] = useState("");
    const [negativeBalance, setNegativeBalance] = useState("");
    const [isActive, setIsActive] = useState(false);


    const handleCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };
    return (
        <div className='add-main-account'>
            <form style={{padding : '0.5rem'}}>
                <br/>
                <select className='select-group' value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option value="" disabled selected>Select Group</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
                </select>  <br /> <br />
                <Input
                    label='Main Account Name'
                    placeholder="Main Account Name"
                    value={accountName}
                    onChange={(e) => { setAccountName(e.target.value) }}
                /> <br />

                <select className='select-currency' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="" disabled selected>Select Currency</option>
                    <option value="Balance Sheet">Balance Sheet</option>
                    <option value="Profit & Loss">Profit & Loss</option>
                </select> <br /> <br />

                <Input
                    label="Positive Balance Symbol"
                    placeholder="DR/CR"
                    value={positiveBalance}
                    onChange={(e) => setPositiveBalance(e.target.value)}
                />

                <br />

                <Input
                    label="Negative Balance Symbol"
                    placeholder="DR/CR"
                    value={negativeBalance}
                    onChange={(e) => setNegativeBalance(e.target.value)}
                />

                <br />


                <label>Remarks</label> <br /> <br />

                <textarea placeholder='Remarks' rows='2' className='textarea' />

                <br /> <br />

                <div className='is-active'>

                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={handleCheckboxChange}
                    />

                    <p>Is Active</p>

                </div>                
            </form >
        </div>

    )
}
