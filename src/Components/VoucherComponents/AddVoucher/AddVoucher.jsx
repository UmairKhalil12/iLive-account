import React, { useCallback, useState } from 'react';
import "./AddVoucher.css";
import Navbar from "../../Navigation/Navbar/Navbar";
import Sidebar from "../../Navigation/Sidebar/Sidebar";
import MasterVoucher from '../MasterVoucher/MasterVoucher';
import FormDetailVoucher from '../FormDetailVoucher/FormDetailVoucher';
import ButtonsDiv from '../ButtonsDiv/ButtonsDiv';
import { useSelector } from 'react-redux';
import { POST_METHOD } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

export default function AddVoucher() {
    const [masterVoucherData, setMasterVoucherData] = useState({});
    const [formDetailData, setFormDetailData] = useState([]);

    const [postData, setPostData] = useState({});

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);

    const navigate = useNavigate();

    const handleMasterVoucherChange = (data) => {
        setMasterVoucherData(data);
        console.log('master data', masterVoucherData)
    };

    const handleFormDetailChange = (data) => {
        setFormDetailData(data);
        console.log('detail data', formDetailData);
    };

    const handleSubmit = async () => {
        const combinedData = { masterVoucherData, formDetailData };
        console.log('combine data', combinedData);

        const details = formDetailData.map((data) => ({
            "id": 0,
            "accountId": data?.account,
            "accountGenId": data?.accountGenric,
            "debit": null,
            "credit": null,
            "currencyId": data?.currency,
            "exchangeRate": 105,
            "chequeNo": null,
            "chequeDate": masterVoucherData?.voucherDate,
            "chequeStatus": true,
            "projectId": 1,
            "narration": data?.narration,
            "costCenter": data?.credit
        }))

        const body = {
            "documents_": [
                {
                    "genricNo": masterVoucherData?.genericNo,
                    "companyId": 100,
                    "locationId": 1,
                    "campusId": 1,
                    "recSourceId": 1,
                    "voucherDate": masterVoucherData?.voucherDate,
                    "accountId": masterVoucherData?.accountHead,
                    "accountGenId": masterVoucherData?.accountGeneric,
                    "debit": null,
                    "credit": null,
                    "currencyId": masterVoucherData?.currency,
                    "exchangeRate": 100,
                    "narration": masterVoucherData?.particulars,
                    "isStatus": 1,
                    "userId": 10131,
                    "id": 0,
                    "details": details
                }
            ]
        }
        try {
            const res = await POST_METHOD('/api/Voucher/InsertVoucher', body);
            setPostData(res);
            console.log('add voucher', postData);
            navigate("/voucher");
        }
        catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <div className={`accounting-page ${isSubmenuVisible ? 'accounting-page-margin' : ''}`}>
            <Sidebar />
            <div className='container-1'>
                <Navbar text='Cash Payment' />
                <ButtonsDiv onSubmit={handleSubmit} /> <br /> <br />
                <MasterVoucher onDataChange={handleMasterVoucherChange} /> <br /> <br />
                <FormDetailVoucher onDataChange={handleFormDetailChange} />
            </div>
        </div>
    );
}
