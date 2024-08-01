import "./Table.css";
import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ActionButton from "../../AccountComponents/ActionButton/ActionButton";
import AccountType from "../../AccountComponents/AccountType/AccountType";
import TableButton from "../TableButton/TableButton";
import { GET_METHOD } from '../../../api/api';
import AddSubAccount from '../../Form/AddSubAccount/AddSubAccount';
import AddMainAccount from '../../Form/AddMainAccount/AddMainAccount';
import { copyToClipboard, exportToExcel, exportToPDF } from '../../../exportUtils/exportUtils';


export default function Table({ onUpdate }) {

    const data = useSelector((state) => state.user.data);
    console.log("table", data);

    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isSubAccount, setIsSubAccount] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEye = useMemo(() => (mainAccountID, parentID, accountType) => {
        const finalParentID = parentID || 0;
        navigate(`/subaccount/${mainAccountID}/${finalParentID}/${accountType}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id, isSubAccount) => {
        const isConfirmed = window.confirm("Do you want to delete this account?");
        if (isConfirmed) {
            try {
                const endpoint = isSubAccount
                    ? `/Api/AccountsApi/deleteSubAccount?Id=${id}&LocationId=1&CampusId=1&UserId=10131`
                    : `/Api/AccountsApi/deleteMainAccount?Id=${id}&LocationId=1&CampusId=1&UserId=10131`;
                const res = await GET_METHOD(endpoint);
                console.log(res, 'delete');
                onUpdate();
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("Account deletion cancelled");
        }
    }, [onUpdate]);

    const handleEdit = useCallback((subAccountId, mainAccountId, isSubAccount, groupId) => {
        setIsSubAccount(isSubAccount);
        setModalData({
            subAccountId,
            mainAccountId,
            groupId,
            data
        });
        openModal();
    }, [data]);

    const columns = useMemo(() => [
        {
            Header: "Account Code",
            accessor: (row) => row.MainAccountGenId || row.SubAccountGenId || "N/A",
        },
        {
            Header: "Account Name",
            accessor: (row) => row.SubAccountName || row.MainAccountName || "N/A",
        },
        {
            Header: "Currency",
            accessor: (row) => row.CurrencyCode || "N/A",
        },
        {
            Header: "Level",
            accessor: (row) => row.AccountLevel || "N/A",
        },
        {
            Header: "Account Type",
            accessor: (row) => row.AccountType || "N/A",
            Cell: ({ cell: { value } }) => (
                <AccountType text={value} />
            )
        },
        {
            Header: "Group",
            accessor: (row) => row.GroupName || "N/A",
        },
        {
            Header: "Child Account",
            accessor: (row) => row.SubAccountCount
        },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="action-icons">
                    <CiEdit style={{ cursor: 'pointer', marginRight: '15px' }} size={12} onClick={() => handleEdit(row?.original?.SubAccountId || 0, row?.original?.MainAccountId, !!row?.original?.SubAccountId, row?.original?.GroupId)} />
                    {row?.original?.IsActive && row?.original?.AccountType === "Control" ? (
                        <IoEyeOutline
                            style={{ cursor: 'pointer', marginRight: '15px' }}
                            size={12}
                            onClick={() => handleEye(
                                row?.original?.MainAccountId,
                                row?.original?.SubAccountId || 0,
                                row?.original?.GroupId,
                                row?.original?.TreeHTML
                            )}
                        />
                    ) : null}
                    {row?.original?.SubAccountCount === 0 ? (
                        <CiTrash
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(
                                row?.original?.SubAccountId || row?.original?.MainAccountId,
                                !!row?.original?.SubAccountId
                            )}
                        />
                    ) : null}
                </div>
            )
        }
    ], [handleEye, handleEdit, handleDelete]);

    const {
        getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage, state: { pageIndex }
    } = useTable({
        columns,
        data: data || []
    }, useSortBy, usePagination);

    const handleCopy = () => copyToClipboard('account-table', setMessage, setCopied);

    const handleExport = () => exportToExcel(data);

    const handleExportPDF = () => exportToPDF('account-table', setMessage);

    return (
        <div className='main-container'>
            <div className='sub-container'>
                <div className='action-btn-container'>
                    <ActionButton text="Excel" onClick={handleExport} />
                    <ActionButton text="Copy" onClick={handleCopy} />
                    <ActionButton text="PDF" onClick={handleExportPDF} />
                </div>
                <div className='search-div'>
                    <div className='search'>
                        <label>Search:</label> <br />
                        <input className='search-input' type='text' />
                    </div>
                </div>
                <div className='table-container'>
                    <table {...getTableProps()} className='table' id='account-table'>
                        <thead className='thead'>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ alignItems: 'center' }}>
                                            {column.render('Header')}
                                            {column.isSorted ? (
                                                <span>{column.isSortedDesc ? <FaSortDown style={{ marginBottom: '-2px' }} /> : <FaSortUp style={{ marginBottom: '-2px' }} />}</span>
                                            ) : <TiArrowUnsorted style={{ marginBottom: '-2px' }} />}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>
                                                {typeof cell.value === 'object' ? JSON.stringify(cell.value) : cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {copied && <p>{message}</p>}
                <div className='table-btn-container'>
                    <TableButton onClick={previousPage} disabled={!canPreviousPage} text="Previous" />
                    &nbsp;
                    <p className='pageIndex'>{pageIndex + 1}</p>
                    &nbsp;
                    <TableButton onClick={nextPage} disabled={!canNextPage} text="Next" />
                </div>
            </div>
            {/* Modals */}
            {isModalOpen && isSubAccount && (
                <AddSubAccount
                    onClose={closeModal}
                    isOpen={isModalOpen}
                    title="Sub Account"
                    GroupId={modalData.groupId}
                    mainAccountID={modalData.mainAccountId}
                    parentID={modalData.subAccountId}
                    update={true}
                />
            )}
            {isModalOpen && !isSubAccount && (
                <AddMainAccount
                    onClose={closeModal}
                    isOpen={isModalOpen}
                    title="Main Account"
                    mainAccountId={modalData.mainAccountId}
                />
            )}
        </div>
    );
}
