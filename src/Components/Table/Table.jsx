import React from 'react';
import "./Table.css";
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import data from "../../assets/data.json";
import ActionButton from "../ActionButton/ActionButton";
import TableButton from '../TableButton/TableButton';
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import AccountType from "../AccountType/AccountType"

export default function Table() {
    const columns = React.useMemo(() => [
        {
            Header: "Account Code",
            accessor: "Account Code"
        },
        {
            Header: "Account Name",
            accessor: "Account Name"
        },
        {
            Header: "Currency",
            accessor: "Currency"
        },
        {
            Header: "Level",
            accessor: "Level"
        },
        {
            Header: "Account Type",
            accessor: "Account Type",
            Cell: ({ cell: { value } }) => (
                <AccountType text={value} />
            )
        },
        {
            Header: "Group",
            accessor: "Group"
        },
        {
            Header: "Child Account",
            accessor: "Child Account"
        },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="action-icons">
                    <CiEdit style={{ cursor: 'pointer', marginRight: '15px' }} size={12} />
                    <IoEyeOutline style={{ cursor: 'pointer', marginRight: '15px' }} size={12} />
                </div>
            )
        }
    ], []);

    const {
        getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage, state: { pageIndex }
    } = useTable({
        columns,
        data: data.data || []
    }, useSortBy, usePagination);

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
                        <input
                            className='search-input'
                            type='text'
                        />
                    </div>
                </div>
                <div className='table-container'>
                    <table {...getTableProps()} className='table'>
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
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
