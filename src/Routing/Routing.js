import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from '../Pages/Account/Account'
import Login from '../Pages/Login/Login'
// import { VscLoading } from 'react-icons/vsc';
import SubAccount from "../Pages/SubAccount/SubAccount"
import Loader from '../Components/Loader/Loader';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path= "/loading" element = {<Loader />} /> 
                <Route path="/subaccount/:mainAccountID/:parentID/:GroupId" element={<SubAccount />} />
            </Routes>
        </BrowserRouter>
    )
}
