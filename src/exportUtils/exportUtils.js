import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const copyToClipboard = async (tableId, setMessage, setCopied) => {
    const table = document.getElementById(tableId);
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

export const exportToExcel = (data, filename = 'account_data.xlsx') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
};

export const exportToPDF = (tableId, setMessage) => {
    const MARGIN = 10;
    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 295;
    const table = document.getElementById(tableId);
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
