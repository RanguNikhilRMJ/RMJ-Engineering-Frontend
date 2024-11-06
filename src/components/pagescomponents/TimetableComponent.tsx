import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import CustomSnackbar from '../CustomSnackbar';

interface TimetableProps {
    fromDate: string;
    endDate: string;
    dayName: string;
    acadamicid: string;
    year: string;
    sem: string;
    subjectCode: string;
    batchName: string;
    courseid: string;
    orgid: string;
    section: string;
    period: string;
    wef: string;
    branchid: string;
}
interface TimetableItem {
    date: string;
    dayName: string;
    subjectCode: string;
    batchName: string;
    sem: string;
    fromDate: string;
    endDate: string;
    acadamicid: string;
    year: string;
    section: string;
    period: string;
    wef: string;
    branchid: string;
    feestatus: boolean; // Ensure feestatus is boolean
}
const TimetableComponent: React.FC<TimetableProps> = ({
    fromDate,
    endDate,
    dayName,
    acadamicid,
    sem,
    subjectCode,
    batchName,
    courseid,
    orgid,
    year,
    section,
    period,
    wef,
    branchid
}) => {
    const startDate = new Date(fromDate);
    const endDateObj = new Date(endDate);
    const [tableData, setTableData] = useState<TimetableItem[]>([{
        date: '',
        dayName: '',
        subjectCode: '',
        batchName: '',
        sem: '',
        fromDate: '',
        endDate: '',
        acadamicid: '',
        year: '',
        section: '',
        period: '',
        wef: '',
        branchid: '',
        feestatus: false,
    }]);
    const [selectAll, setSelectAll] = useState(false);
    const [Message, setMessage] = useState<string | null>(null);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('error' as 'error' | 'success');

    // Populate tableData on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token') || undefined;
                const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allSubjectDetails`;
                const response = await fetchCardDetailstoken(apiEndpoint, 'GET', null, token);
                const filteredData = response.filter((item: any) => item.subjectcode === subjectCode);

                const newData: TimetableItem[] = [];
                const currentDate = new Date(startDate);

                while (currentDate <= endDateObj) {
                    if (currentDate.getDay() === getDayIndex(dayName)) {
                        const formattedDate = currentDate.toISOString().slice(0, 10);
                        if (formattedDate >= wef) {
                            const initialFeestatus = true; // Example: Initial state of feestatus
                            newData.push({
                                date: formattedDate,
                                dayName: dayName,
                                subjectCode: subjectCode,
                                batchName: batchName,
                                sem: sem,
                                fromDate: fromDate,
                                endDate: endDate,
                                acadamicid: acadamicid,
                                year: year,
                                section: section,
                                period: period,
                                wef: wef,
                                branchid: branchid,
                                feestatus: initialFeestatus,
                            });
                        }
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                setTableData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error fetching data
            }
        };

        fetchData();
    }, [startDate, endDateObj, dayName, acadamicid, sem, subjectCode, batchName, courseid, orgid, year, section, period, wef, branchid]);

    const handleSelectAllChange = () => {
        const updatedData = tableData.map(item => ({
            ...item,
            feestatus: !selectAll, // Toggle feestatus based on selectAll state
        }));
        setTableData(updatedData);
        setSelectAll(prevSelectAll => !prevSelectAll); // Toggle selectAll state
    };
    const handleCheckboxChange = (index: number) => {
        setTableData((prevStudents) => {
          const updatedStudents = [...prevStudents];
          updatedStudents[index] = {
            ...updatedStudents[index],
            feestatus: !updatedStudents[index].feestatus,
          };
          return updatedStudents;
        });
      };
  

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || undefined;
        const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/allSubjectDetails`;
        const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
        const filteredbr = fetchedDatabr.filter((college: any) => college.subjectcode === subjectCode);
        const eregulationname = filteredbr[0].regulationname;
        
        const fee = tableData.filter((classItem) => classItem.feestatus);
        const attendanceData = fee.map((fee) => ({
            id: '0',
            orgid: orgid,
            acadamicid: fee.acadamicid,
            courseid: courseid,
            branchid: fee.branchid,
            year: fee.year,
            sem: fee.sem,
            regulation: eregulationname,
            section: section,
            subjectcode: fee.subjectCode,
            day: fee.dayName,
            period: period,
            wef: fee.wef,
            date: fee.date,
            roomno: 'NA',
            block: 'NA',
            batch: fee.batchName,
            type: 'offline',
            deletestatus:'NA',
        }));
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/tblstimetable/bulk`;
        const registeredData = await fetchCardDetailstoken(apiEndpoint, 'POST', attendanceData,token);
        setMessage(registeredData);
        setSnackbarOpen(true);
        setSeverity('success');
        setTimeout(() => {
            setSnackbarOpen(false);
            setMessage(null);
        }, 5000);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setMessage(null);
    };

    return (
        <>
            <CustomSnackbar
                open={isSnackbarOpen}
                onClose={handleCloseSnackbar}
                severity={severity}
                message={Message}
            />
            <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Day Name</TableCell>
                            <TableCell>Subject Code</TableCell>
                            <TableCell>Batch Name</TableCell>
                            <TableCell>Semester</TableCell>
                            <TableCell>period</TableCell>
                            <TableCell>From Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>feestatus</TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                    color="secondary"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.dayName}</TableCell>
                                <TableCell>{item.subjectCode}</TableCell>
                                <TableCell>{item.batchName}</TableCell>
                                <TableCell>{item.sem}</TableCell>
                                <TableCell>{item.period}</TableCell>
                                <TableCell>{item.fromDate}</TableCell>
                                <TableCell>{item.endDate}</TableCell>
                                <TableCell>{item.feestatus? 'Present' : 'Absent'}</TableCell>
                                <TableCell>
                                <Checkbox
    checked={item.feestatus}
    onChange={() => handleCheckboxChange(index)}
/>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </>
    );
};

const getDayIndex = (dayName: string) => {
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays.indexOf(dayName);
};

export default TimetableComponent;