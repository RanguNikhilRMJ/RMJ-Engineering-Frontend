import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

interface Student {
  id: number;
  studentRollno: number;
  name: string;
  year: number;
  sem: number;
  subjectcode: string;
  subjectname: string;
  totalmarks: number;
  gradepoints: number;
  grade: string;
  credits: number;
  status: boolean;
}

const students: Student[] = [
  {
    "id": 1,
    "studentRollno": 1234,
    "name": "John Doe",
    "year": 3,
    "sem": 1,
    "subjectcode": "SUB123",
    "subjectname": "Mathematics",
    "totalmarks": 85,
    "gradepoints": 9,
    "grade": "A",
    "credits": 3,
    "status": true
  },
  {
    "id": 2,
    "studentRollno": 1234,
    "name": "John Doe",
    "year": 3,
    "sem": 1,
    "subjectcode": "SUB124",
    "subjectname": "Physics",
    "totalmarks": 78,
    "gradepoints": 8,
    "grade": "B",
    "credits": 4,
    "status": true
  },
  {
    "id": 3,
    "studentRollno": 1234,
    "name": "John Doe",
    "year": 3,
    "sem": 1,
    "subjectcode": "SUB125",
    "subjectname": "Chemistry",
    "totalmarks": 92,
    "gradepoints": 10,
    "grade": "A",
    "credits": 2,
    "status": true
  },
  {
    "id": 4,
    "studentRollno": 5678,
    "name": "Jane Smith",
    "year": 2,
    "sem": 2,
    "subjectcode": "SUB126",
    "subjectname": "Biology",
    "totalmarks": 68,
    "gradepoints": 7,
    "grade": "C",
    "credits": 3,
    "status": false
  },
  {
    "id": 5,
    "studentRollno": 5678,
    "name": "Jane Smith",
    "year": 2,
    "sem": 2,
    "subjectcode": "SUB127",
    "subjectname": "History",
    "totalmarks": 74,
    "gradepoints": 8,
    "grade": "B",
    "credits": 3,
    "status": false
  },
  {
    "id": 6,
    "studentRollno": 5678,
    "name": "Jane Smith",
    "year": 2,
    "sem": 2,
    "subjectcode": "SUB128",
    "subjectname": "Geography",
    "totalmarks": 82,
    "gradepoints": 9,
    "grade": "A",
    "credits": 2,
    "status": true
  },
  {
    "id": 7,
    "studentRollno": 9101,
    "name": "Alice Johnson",
    "year": 1,
    "sem": 1,
    "subjectcode": "SUB129",
    "subjectname": "Literature",
    "totalmarks": 88,
    "gradepoints": 9,
    "grade": "A",
    "credits": 3,
    "status": true
  },
  {
    "id": 8,
    "studentRollno": 9101,
    "name": "Alice Johnson",
    "year": 1,
    "sem": 1,
    "subjectcode": "SUB130",
    "subjectname": "Art",
    "totalmarks": 91,
    "gradepoints": 10,
    "grade": "A",
    "credits": 2,
    "status": true
  },
  {
    "id": 9,
    "studentRollno": 9101,
    "name": "Alice Johnson",
    "year": 1,
    "sem": 1,
    "subjectcode": "SUB131",
    "subjectname": "Music",
    "totalmarks": 85,
    "gradepoints": 9,
    "grade": "A",
    "credits": 1,
    "status": true
  }
];

const TableContainerStyled = styled(TableContainer)(
  ({ theme }) => ({
    marginBottom: theme.spacing(2),
  })
);

const TableCellHeader = styled(TableCell)(
  ({ theme }) => ({
    border: '1px solid black',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: '100px',
  })
);

const TableCellContent = styled(TableCell)(
  ({ theme }) => ({
    border: '1px solid black',
    textAlign: 'center',
    minWidth: '100px',
  })
);

const DynamicTable: React.FC = () => {
  const years = Array.from(new Set(students.map(s => s.year)));
  const studentRollnos = Array.from(new Set(students.map(s => s.studentRollno)));

  const getSubjectsForYearAndSem = (year: number, sem: number) => {
    return Array.from(new Set(
      students
        .filter(s => s.year === year && s.sem === sem)
        .map(s => `${s.subjectname} (${s.subjectcode})`)
    ));
  };

  const pivotData: { [key: number]: { [key: number]: { [key: number]: { [key: string]: Student | undefined } } } } = {};
  studentRollnos.forEach(rollno => {
    pivotData[rollno] = {};
    years.forEach(year => {
      pivotData[rollno][year] = {};
      const semesters = Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem)));
      semesters.forEach(sem => {
        pivotData[rollno][year][sem] = {};
        const subjects = getSubjectsForYearAndSem(year, sem);
        subjects.forEach(subject => {
          const [subjectname, subjectcode] = subject.split(' (');
          const student = students.find(student =>
            student.studentRollno === rollno &&
            student.subjectname === subjectname &&
            student.subjectcode === subjectcode.slice(0, -1) && // Remove closing parenthesis
            student.sem === sem &&
            student.year === year
          );
          pivotData[rollno][year][sem][subject] = student;
        });
      });
    });
  });

  return (
    <TableContainerStyled>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader rowSpan={4}>Student Roll No</TableCellHeader>
            {years.map(year => (
              <TableCellHeader key={year} colSpan={5 * Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem))).length * getSubjectsForYearAndSem(year, 1).length} align="center">Year {year}</TableCellHeader>
            ))}
          </TableRow>
          <TableRow>
            {years.map(year => (
              Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem))).map(sem => (
                <TableCellHeader key={sem} colSpan={5 * getSubjectsForYearAndSem(year, sem).length} align="center">Sem {sem}</TableCellHeader>
              ))
            ))}
          </TableRow>
          <TableRow>
            {years.map(year => (
              Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem))).map(sem => (
                getSubjectsForYearAndSem(year, sem).map(subject => (
                  <TableCellHeader key={subject} colSpan={5} align="center">{subject}</TableCellHeader>
                ))
              ))
            ))}
          </TableRow>
          <TableRow>
            {years.map(year => (
              Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem))).map(sem => (
                getSubjectsForYearAndSem(year, sem).map(subject => (
                  <>
                    <TableCellHeader key={`totalmarks-${year}-${sem}-${subject}`} align="center">Total Marks</TableCellHeader>
                    <TableCellHeader key={`gradepoints-${year}-${sem}-${subject}`} align="center">Grade Points</TableCellHeader>
                    <TableCellHeader key={`grade-${year}-${sem}-${subject}`} align="center">Grade</TableCellHeader>
                    <TableCellHeader key={`credits-${year}-${sem}-${subject}`} align="center">Credits</TableCellHeader>
                    <TableCellHeader key={`passfail-${year}-${sem}-${subject}`} align="center">Pass/Fail</TableCellHeader>
                  </>
                ))
              ))
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {studentRollnos.map(rollno => (
            <TableRow key={rollno}>
              <TableCellContent>{rollno}</TableCellContent>
              {years.map(year => (
                Array.from(new Set(students.filter(s => s.year === year).map(s => s.sem))).map(sem => (
                  getSubjectsForYearAndSem(year, sem).map(subject => (
                    <>
                      <TableCellContent key={`totalmarks-${rollno}-${year}-${sem}-${subject}`}>
                        {pivotData[rollno][year][sem][subject] ? pivotData[rollno][year][sem][subject]!.totalmarks : "N/A"}
                      </TableCellContent>
                      <TableCellContent key={`gradepoints-${rollno}-${year}-${sem}-${subject}`}>
                        {pivotData[rollno][year][sem][subject] ? pivotData[rollno][year][sem][subject]!.gradepoints : "N/A"}
                      </TableCellContent>
                      <TableCellContent key={`grade-${rollno}-${year}-${sem}-${subject}`}>
                        {pivotData[rollno][year][sem][subject] ? pivotData[rollno][year][sem][subject]!.grade : "N/A"}
                      </TableCellContent>
                      <TableCellContent key={`credits-${rollno}-${year}-${sem}-${subject}`}>
                        {pivotData[rollno][year][sem][subject] ? pivotData[rollno][year][sem][subject]!.credits : "N/A"}
                      </TableCellContent>
                      <TableCellContent key={`passfail-${rollno}-${year}-${sem}-${subject}`}>
                        {pivotData[rollno][year][sem][subject] ? (pivotData[rollno][year][sem][subject]!.status ? "Pass" : "Fail") : "N/A"}
                      </TableCellContent>
                    </>
                  ))
                ))
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerStyled>
  );
};

export default DynamicTable;