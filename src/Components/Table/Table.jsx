import React from 'react';
import "./Table.css";
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import data from "../../assets/data.json"
import ActionButton from "../ActionButton/ActionButton";
import TableButton from '../TableButton/TableButton';

export default function Table() {
    const columns = React.useMemo(() => [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Age",
            accessor: "age"
        },
        {
            Header: "Gender",
            accessor: "gender"
        }
    ], []);

    const {
        getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, previousPage,
        canNextPage, canPreviousPage, state: { pageIndex }
    } = useTable({
        columns,
        data: data.data
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
                        ></input>

                    </div>
                </div>
                <div className='table-container'>
                    <table {...getTableProps()} className='table'>
                        <thead className='thead'>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            {column.isSorted ? (
                                                <span>{column.isSortedDesc ? <FaSortDown /> : <FaSortUp />}</span>
                                            ) : <TiArrowUnsorted />}
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
