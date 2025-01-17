import React, { useState, useEffect } from 'react';
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
    const { RecSourceId } = useParams();

    const handleMasterVoucherChange = (data) => {
        setMasterVoucherData(data);
    };

    const handleFormDetailChange = (data) => {
        setFormDetailData(data);
    };

    const handleSubmit = async () => {

        if (RecSourceId == 375) {
            const totalCredit = formDetailData.reduce((sum, item) => sum + (parseFloat(item.credit) || 0), 0);
            const totalDebit = formDetailData.reduce((sum, item) => sum + (parseFloat(item.debit) || 0), 0);
            if (totalCredit !== totalDebit) {
                window.alert('Total credit and debit amounts must be equal.');
                return;
            }
        }
        const combinedData = { masterVoucherData, formDetailData };
        console.log('combine data', combinedData);

        let TotalAmount = 0;
        if (RecSourceId == 371 || RecSourceId == 373) {
            TotalAmount = formDetailData?.reduce((sum, data) => {
                return sum + (parseInt(data?.debit) || 0);
            }, 0);
        }
        if (RecSourceId == 372 || RecSourceId == 374) {
            TotalAmount = formDetailData?.reduce((sum, data) => {
                return sum + (parseInt(data?.credit) || 0);
            }, 0);
        }

        console.log(TotalAmount, 'totalAmount');

        const details = formDetailData?.map((data) => ({
            "id": id ? data?.updatingId : 0,
            "accountId": data?.account,
            "accountGenId": data?.selected,
            "debit": RecSourceId == 371 || RecSourceId == 373 ? data?.debit : RecSourceId == 375 ? data?.debit : 0,
            "credit": RecSourceId == 372 || RecSourceId == 374 ? data?.credit : RecSourceId == 375 ? data?.credit : 0,
            "currencyId": data?.currency,
            "exchangeRate": 105,
            "chequeNo": null,
            "chequeDate": masterVoucherData?.voucherDate,
            "chequeStatus": true,
            "projectId": 1,
            "narration": data?.narration,
            "costCenter": null
        }));

        const body = {
            "documents_": [
                {
                    "companyId": 100,
                    "locationId": 1,
                    "campusId": 1,
                    "recSourceId": parseInt(RecSourceId),
                    "voucherDate": masterVoucherData?.voucherDate,
                    "accountId": masterVoucherData?.accountId,
                    "accountGenId": masterVoucherData?.accountGeneric,
                    "debit": RecSourceId == 372 || RecSourceId == 374 ? TotalAmount : null,
                    "credit": RecSourceId == 371 || RecSourceId == 373 ? TotalAmount : null,
                    "currencyId": parseInt(masterVoucherData?.currency),
                    "exchangeRate": 100,
                    "narration": masterVoucherData?.particulars,
                    "isStatus": 1,
                    "userId": 10131,
                    "id": id ? parseInt(id) : 0,
                    "details": details
                }
            ]
        };

        console.log(body, 'for debugging updation');

        try {
            console.log("posting voucher", body);
            const res = id
                ? await POST_METHOD('/api/Voucher/InsertVoucher', body)
                : await POST_METHOD('/api/Voucher/InsertVoucher', body);

            setPostData(res);
            console.log('add voucher', postData);
            if (RecSourceId == 371) {
                navigate("/voucher");
            }
            else if (RecSourceId == 372) {
                navigate("/CashRecieveVoucher")
            }

            else if (RecSourceId == 373) {
                navigate("/BankPaymentVoucher")
            }
            else if (RecSourceId == 374) {
                navigate("/BankRecieveVoucher")
            }
            else if (RecSourceId == 375) {
                navigate("/JournalVoucher")
            }

        } catch (error) {
            console.log("error", error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {

            const res = await GET_METHOD_LOCAL(`/api/Voucher/GetVoucherMasterAndDetailById?id=${id}&RecSourceId=${RecSourceId}`);

            if (res) {
                console.log(res, 'get voucher by id res');
                console.log(res[0].AccountId, res[0].AccountGenricNo);
                setMasterVoucherData({
                    voucherDate: res[0]?.VoucherDate,
                    currency: res[0]?.CurrencyId,
                    particulars: res[0]?.Narration,
                    accountId: res[0].AccountId,
                    accountGeneric: res[0].AccountGenricNo,
                    accountHead: res[0].AccountGenricNo,
                });

                const details = res?.map((d) => {
                    const detail = {
                        account: d.AccountId1,
                        accountGenric: d.GenricNo1,
                        currency: d.CurrencyId1,
                        narration: d.Narration1,
                        selected: d.AccountGenricNo1,
                        updatingId: d.Id1
                    };

                    if (RecSourceId == 372 || RecSourceId == 374 || RecSourceId == 375) {
                        detail.credit = d.AccountCredit1;
                    }
                    if (RecSourceId == 371 || RecSourceId == 373 || RecSourceId == 375) {
                        detail.debit = d.AccountDebit1;
                    }

                    return detail;
                });

                setFormDetailData(details);

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

    const textRendering = () => {
        // console.log(RecSourceId, 'text rendering recSourceID');

        if (RecSourceId == 371) {
            return 'Cash Payment'
        }
        else if (RecSourceId == 372) {
            return 'Cash Recieve'
        }

        else if (RecSourceId == 373) {
            return 'Bank Payment'
        }
        else if (RecSourceId == 374) {
            return 'Bank Recieve'
        }
        else if (RecSourceId == 375) {
            return 'Journal Voucher'
        }
        else {
            return 'Voucher'
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <div className={`accounting-page ${isSubmenuVisible ? 'accounting-page-margin' : ''}`}>
                    <Sidebar />
                    <div className='container-1'>
                        <Navbar text={textRendering()} />
                        <ButtonsDiv onSubmit={handleSubmit} />
                        <br /> <br />
                        <MasterVoucher
                            data={id ? masterVoucherData : null}
                            onDataChange={handleMasterVoucherChange}
                            JournalVoucher={RecSourceId == 375 ? true : false}
                        />

                        <br /> <br />
                        <FormDetailVoucher
                            data={id ? formDetailData : null}
                            onDataChange={handleFormDetailChange}
                            JournalVoucher={RecSourceId == 375 ? true : false}
                            RecSourceId={RecSourceId}
                        />
                    </div>
                </div>
            }
        </>
    );
}
