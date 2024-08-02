import React from 'react'
import Sidebar from '../../../Components/Navigation/Sidebar/Sidebar';
import SelectAdd from '../../../Components/OtherComponents/SelectAdd/SelectAdd';
import VoucherTable from "../../../Components/AllTable/VoucherTable/VoucherTable";
import Navbar from '../../../Components/Navigation/Navbar/Navbar';
import { useSelector } from 'react-redux';

export default function JournalVoucher() {
  const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);

  return (
    <div>
      <div className={isSubmenuVisible ? 'accountig-page-margin' : 'accounting-page'}>
        <Sidebar />
        <div className='container-1'>
          <Navbar text='Journal Voucher' />
          <SelectAdd accountType='Add Voucher' voucherType ={375} />
          <VoucherTable voucherType={375} />
        </div>
      </div>
    </div>
  )
}
