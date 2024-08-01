import React from 'react'
import Sidebar from '../../../Components/Navigation/Sidebar/Sidebar';
import SelectAdd from '../../../Components/OtherComponents/SelectAdd/SelectAdd';
import VoucherTable from "../../../Components/AllTable/VoucherTable/VoucherTable";
import Navbar from '../../../Components/Navigation/Navbar/Navbar';
import { useSelector } from 'react-redux';

export default function BankPaymentVoucherPage() {
  const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);

  return (
    <div>
      <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
        <Sidebar />
        <div className='container-1'>
          <Navbar text='Bank Payment' />
          <SelectAdd accountType='Add Voucher' voucherType ={373} />
          <VoucherTable voucherType={373} />
        </div>
      </div>
    </div>
  )
}
