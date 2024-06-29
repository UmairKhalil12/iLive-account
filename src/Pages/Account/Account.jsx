import React from 'react'
import './Account.css'
import Navbar from '../../Components/Navbar/Navbar'
import Table from '../../Components/Table/Table'



export default function Account() {
    const accounts = [
        {
            id: 1,
            "account": 'acc-1'
        },
        {
            id: 2,
            "account": 'acc-2'
        },
        {
            id: 3,
            "account": 'acc-3'
        },
        {
            id: 4,
            "account": 'acc-4'
        }
    ]
    return (
        <div className='accounting-page'>
            <Navbar />
            <div className='select-add'>
                <div>
                <select className='select-account'>
                    {accounts.map((acc) => {
                        return (
                            <option key={acc?.id} >{acc?.account}</option>
                        )
                    })}
                </select>

                </div>
            </div>
            <Table />
        </div>
    )
}
