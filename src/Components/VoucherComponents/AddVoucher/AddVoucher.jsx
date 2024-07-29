import React, { useCallback, useState, useEffect } from 'react';
import "./AddVoucher.css";
import Navbar from "../../Navigation/Navbar/Navbar";
import Sidebar from "../../Navigation/Sidebar/Sidebar";
import MasterVoucher from '../MasterVoucher/MasterVoucher';
import FormDetailVoucher from '../FormDetailVoucher/FormDetailVoucher';
import ButtonsDiv from '../ButtonsDiv/ButtonsDiv';
import { useSelector } from 'react-redux';
import { GET_METHOD_LOCAL, POST_METHOD } from '../../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../OtherComponents/Loader/Loader';

export default function AddVoucher() {
    const [masterVoucherData, setMasterVoucherData] = useState({});
    const [formDetailData, setFormDetailData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [postData, setPostData] = useState({});

    const isSubmenuVisible = useSelector((state) => state.user.isSubmenuVisible);

    const navigate = useNavigate();

    const { id } = useParams();

    const handleMasterVoucherChange = (data) => {
        setMasterVoucherData(data);
        // console.log('master data', masterVoucherData);
    };

    const handleFormDetailChange = (data) => {
        setFormDetailData(data);
        // console.log('detail data', formDetailData);
    };

    const handleSubmit = async () => {
        const combinedData = { masterVoucherData, formDetailData };
        console.log('combine data', combinedData);

        const details = formDetailData?.map((data) => ({
            "id": id ? id : 0,
            "accountId": data?.account,
            "accountGenId": data?.selected,
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
        }));

        const body = {
            "documents_": [
                {
                    "genricNo": masterVoucherData?.genericNo,
                    "companyId": 100,
                    "locationId": 1,
                    "campusId": 1,
                    "recSourceId": 1,
                    "voucherDate": masterVoucherData?.voucherDate,
                    "accountId": masterVoucherData?.accountId,
                    "accountGenId": masterVoucherData?.accountGeneric,
                    "debit": null,
                    "credit": null,
                    "currencyId": masterVoucherData?.currency,
                    "exchangeRate": 100,
                    "narration": masterVoucherData?.particulars,
                    "isStatus": 1,
                    "userId": 10131,
                    "id": id ? id : 0,
                    "details": details
                }
            ]
        };

        try {
            console.log("posting voucher", body);
            const res = id
                ? await POST_METHOD('/api/Voucher/InsertVoucher', body)
                : await POST_METHOD('/api/Voucher/InsertVoucher', body);

            setPostData(res);
            console.log('add voucher', postData);
            navigate("/voucher");
        } catch (error) {
            console.log("error", error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await GET_METHOD_LOCAL(`/api/Voucher/GetVoucherMasterAndDetailById?id=${id}`);
            console.log(res, 'get voucher by id res');
            if (res) {
                setMasterVoucherData({
                    voucherDate: res[0]?.VoucherDate,
                    currency: res[0]?.CurrencyId,
                    particulars: res[0]?.Narration,
                    accountId: res[0]?.AccountId,
                    accountGeneric: res[0]?.AccountGenricNo,
                    genericNo: res[0]?.GenricNo,
                    accountHead: res[0]?.AccountGenricNo
                });

                const details = res?.map((d) => ({
                    account: d.AccountId1,
                    accountGenric: d.GenricNo1,
                    credit: d.CostCenter1,
                    currency: d.CurrencyId1,
                    narration: d.Narration1,
                    selected: d.AccountGenricNo1
                }));

                setFormDetailData(details);

                console.log(masterVoucherData);
                console.log(formDetailData);
            }
            setLoading(false);
        };

        if (id) {
            fetchData();
        }
        else {
            setLoading(false);
        }
    }, [id]);

    return (
        <>
            {loading ? <Loader /> :
                <div className={`accounting-page ${isSubmenuVisible ? 'accounting-page-margin' : ''}`}>
                    <Sidebar />
                    <div className='container-1'>
                        <Navbar text='Cash Payment' />
                        <ButtonsDiv onSubmit={handleSubmit} />
                        <br /> <br />
                        <MasterVoucher
                            data={id ? masterVoucherData : null}
                            onDataChange={handleMasterVoucherChange} />
                        <br /> <br />
                        <FormDetailVoucher
                            data={id ? formDetailData : null}
                            onDataChange={handleFormDetailChange}
                        />
                    </div>
                </div>
            }
        </>
    );
}
