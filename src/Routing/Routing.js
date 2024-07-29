import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from '../Pages/Account/Account'
import Login from '../Pages/Login/Login'
// import { VscLoading } from 'react-icons/vsc';
import SubAccount from "../Pages/SubAccount/SubAccount"
import Loader from '../Components/OtherComponents/Loader/Loader';
import FilterAccount from '../Pages/FilterAccount/FilterAccount';
import Voucher from '../Pages/Vouchers/Voucher';
import AddVoucher from "../Components/VoucherComponents/AddVoucher/AddVoucher";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loading" element={<Loader />} />
                <Route path="/subaccount/:mainAccountID/:parentID/:GroupId" element={<SubAccount />} />
                <Route path="/filter/:id" element={<FilterAccount />} />
                <Route path='/voucher' element={<Voucher />} />
                <Route path='/AddVoucher' element={<AddVoucher />} />
                <Route path='/AddVoucher/:id' element={<AddVoucher />} />
            </Routes>
        </BrowserRouter>
    )
}
