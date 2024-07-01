import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from '../Pages/Account/Account'
import Login from '../Pages/Login/Login'

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
