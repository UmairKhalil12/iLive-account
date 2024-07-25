import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import ActionButton from "../ActionButton/ActionButton";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import TableButton from "../TableButton/TableButton";
// import { copyToClipboard, exportToExcel, exportToPDF } from '../../exportUtils/exportUtils';

export default function VoucherTable() {

    const data = useMemo(() => [], []); // Memoized empty data array

    const columns = useMemo(() => [
        {
            Header: "Voucher Number",
            accessor: (row) => row.RowId || "N/A",
        },
        {
            Header: "Voucher Date",
            accessor: (row) => row.VoucherDate || "N/A",
        },
        {
            Header: "Account Code",
            accessor: (row) => row.AccountId || "N/A",
        },
        {
            Header: "Account Name",
            accessor: (row) => row.AccountId || "N/A",
        },
        {
            Header: "Narration",
            accessor: (row) => row.Narration || "N/A",
        },
        {
            Header: "Currency",
            accessor: (row) => row.CurrencyId || "N/A",
        },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: () => (
                <div className="action-icons">
                    <CiEdit style={{ cursor: 'pointer', marginRight: '15px' }} size={12} />
                    <IoEyeOutline style={{ cursor: 'pointer', marginRight: '15px' }} size={12} />
                    <CiTrash style={{ cursor: 'pointer' }} />
                </div>
            )
        }
    ], []);

    const {
        getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage, state: { pageIndex }
    } = useTable({
        columns,
        data
    }, useSortBy, usePagination);

    // const handleCopy = () => copyToClipboard('account-table', setMessage, setCopied);

    // const handleExport = () => exportToExcel();

    // const handleExportPDF = () => exportToPDF('account-table', setMessage);

    return (
        <div className='main-container'>
            <div className='sub-container'>
                <div className='action-btn-container'>
                    <ActionButton text="Excel" />
                    <ActionButton text="Copy" />
                    <ActionButton text="PDF" />
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

                <div className='table-btn-container'>
                    <TableButton onClick={previousPage} disabled={!canPreviousPage} text="Previous" />
                    &nbsp;
                    <p className='pageIndex'>{pageIndex + 1}</p>
                    &nbsp;
                    <TableButton onClick={nextPage} disabled={!canNextPage} text="Next" />
                </div>
            </div>
        </div>
    );
}