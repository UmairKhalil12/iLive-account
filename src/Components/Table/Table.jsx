import React, { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
// import data from "../../assets/data.json";
import ActionButton from "../ActionButton/ActionButton";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import AccountType from "../AccountType/AccountType";
import TableButton from "../TableButton/TableButton";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./Table.css";

export default function Table({data}) {

    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const columns = React.useMemo(() => [
        {
            Header: "Account Code",
            accessor: "MainAccountGenId"
        },
        {
            Header: "Account Name",
            accessor: "MainAccountName"
        },
        {
            Header: "Currency",
            accessor: "CurrencyCode"
        },
        {
            Header: "Level",
            accessor: "AccountLevel"
        },
        {
            Header: "Account Type",
            accessor: "AccountType",
            Cell: ({ cell: { value } }) => (
                <AccountType text={value} />
            )
        },
        {
            Header: "Group",
            accessor: "GroupName"
        },
        {
            Header: "Child Account",
            accessor: "SubAccountCount"
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
        data: data || []
    }, useSortBy, usePagination);

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(data.data);
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

        // Extract text content from the table
        const rows = table.querySelectorAll('tr');
        let text = '';

        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowText = Array.from(cells)
                .map(cell => cell.innerText.trim())
                .join('\t'); // Tab-separated values
            text += rowText + '\n'; // New line for each row
        });

        // Create a temporary textarea to hold the text content
        const textarea = document.createElement('textarea');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        textarea.value = text;
        document.body.appendChild(textarea);

        // Select and copy the text
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

        // Clean up
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

            // Add the first page
            pdf.addImage(imgData, 'PNG', MARGIN, position, imgWidth, imgHeight);
            let heightLeftAfterPage = heightLeft;

            // Add additional pages if needed
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
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
        </div>
    );
}
