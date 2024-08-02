import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from '../Pages/Account/Account'
import Login from '../Pages/Login/Login'
import SubAccount from "../Pages/SubAccount/SubAccount"
import Loader from '../Components/OtherComponents/Loader/Loader';
import FilterAccount from '../Pages/FilterAccount/FilterAccount';
import Voucher from '../Pages/Vouchers/CashPaymentVoucher/Voucher';
import AddVoucher from "../Components/VoucherComponents/AddVoucher/AddVoucher";
import CashRecieveVoucherPage from '../Pages/Vouchers/CashRecieveVoucherPage/CashRecieveVoucherPage';
import BankRecieveVoucher from "../Pages/Vouchers/BankRecieveVoucher/BankRecieveVoucher";
import BankPaymentVoucher from "../Pages/Vouchers/BankPaymentVoucher/BankPaymentVoucher";
import JournalVoucher from '../Pages/Vouchers/JournalVoucher/JournalVoucher';

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
                <Route path='/AddVoucher/:RecSourceId/:id' element={<AddVoucher />} />
                <Route path='/AddVoucher/:RecSourceId' element={<AddVoucher />} />
                <Route path='/CashRecieveVoucher' element={<CashRecieveVoucherPage />} />
                <Route path='/BankPaymentVoucher' element={<BankPaymentVoucher />} />
                <Route path='/BankRecieveVoucher' element={<BankRecieveVoucher />} />
                <Route path = "/JournalVoucher" element = {<JournalVoucher />} />
            </Routes>
        </BrowserRouter>
    )
}
