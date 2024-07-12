import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import ActionButton from "../ActionButton/ActionButton";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import AccountType from "../AccountType/AccountType";
import TableButton from "../TableButton/TableButton";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./Table.css";
import { useNavigate } from 'react-router-dom';
import { GET_METHOD } from '../../api/api';
import AddSubAccount from '../AddSubAccount/AddSubAccount';
import AddMainAccount from '../AddMainAccount/AddMainAccount';

export default function Table({ data }) {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isSubAccount, setIsSubAccount] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEye = useMemo(() => (mainAccountID, parentID, accountType) => {
        const finalParentID = parentID || 0; // Use 0 if parentID is falsy
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
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("Account deletion cancelled");
        }
    }, []);

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


    const columns = React.useMemo(() => [
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
                    {row?.original?.AccountType === "Control" && (
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
                    )}
                    {row?.original?.SubAccountCount === 0 ? (
                        <CiTrash
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

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'account_data.xlsx');
    };

    const handleCopy = async () => {
        const table = document.getElementById('account-table');
        if (!table) {
            setMessage('Table not found!');
            return;
        }

        const rows = table.querySelectorAll('tr');
        let text = '';

        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowText = Array.from(cells)
                .map(cell => cell.innerText.trim())
                .join('\t'); // Tab-separated values
            text += rowText + '\n'; // New line for each row
        });

        const textarea = document.createElement('textarea');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        textarea.value = text;
        document.body.appendChild(textarea);

        textarea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setMessage('Copied to clipboard!');
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setMessage('');
                }, 2000);
            } else {
                setMessage('Failed to copy!');
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            setMessage('Failed to copy!');
        }

        document.body.removeChild(textarea);
    };

    const handleExportPDF = () => {
        const MARGIN = 10;
        const PAGE_WIDTH = 210;
        const PAGE_HEIGHT = 295;
        const table = document.getElementById('account-table');
        if (!table) {
            setMessage('Table not found!');
            return;
        }

        html2canvas(table, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = PAGE_WIDTH - 2 * MARGIN; // Adjust width for margins
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight - (PAGE_HEIGHT - 2 * MARGIN); // Adjust height for margins

            let position = MARGIN;

            pdf.addImage(imgData, 'PNG', MARGIN, position, imgWidth, imgHeight);
            let heightLeftAfterPage = heightLeft;

            while (heightLeftAfterPage > 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', MARGIN, -heightLeftAfterPage, imgWidth, imgHeight);
                heightLeftAfterPage -= PAGE_HEIGHT - 2 * MARGIN;
            }

            pdf.save('account_data.pdf');
        }).catch(error => {
            console.error('Failed to create PDF: ', error);
            setMessage('Failed to create PDF!');
        });
    };

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
                    data={modalData.data}
                />
            )}
            {isModalOpen && !isSubAccount && (
                <AddMainAccount
                    onClose={closeModal}
                    isOpen={isModalOpen}
                    title="Main Account"
                    data={modalData.data}
                />
            )}
        </div>
    );
}
