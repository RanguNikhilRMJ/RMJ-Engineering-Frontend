// "use client"
// import React,{useState} from 'react'
// import Collegedp from '@/components/dropdown/Collegedp';
// import Coursedp from '@/components/dropdown/Coursedp';
// import SemDp from '@/components/dropdown/SemDp';
// import YearDp from '@/components/dropdown/YearDp';
// import Departmentdp from '@/components/dropdown/Departmentdp';
// import Fdepartmentdp from '@/components/dropdown/Fdepartmentdp';
// import FCoursedp from '@/components/dropdown/FCoursedp';
// import SectionDp from '@/components/dropdown/SectionDp';
// function page() {
//     const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');
//     const [selectedCourseId, setSelectedCourseId] = useState<string>('');
//     const [selectedyear, setSelectedyear] = useState<string>('');
//     const [selectedsem, setSelectedsem] = useState<string>('');
//     const [selectedbranch, setSelectedbranch] = useState<string>('');
//     const [selectedsection, setSelectedsection] = useState<string>('');
//     const [selectedbranchf, setSelectedbranchf] = useState<string>('');
//     const [selectedCourseIdf, setSelectedCourseIdf] = useState<string>('');
//     const handleOrgSelect = (label: string, value: string) => {
//         setSelectedSchoolId(value);
//       };
//       const handleCourseSelect = (label: string, value: string) => {
//         setSelectedCourseId(value);
//       };

//       const handleyearSelect = (label: string, value: string) => {
//         setSelectedyear(value);
//       };
//       const handlesemSelect = (label: string, value: string) => {
//         setSelectedsem(value);
//       };
//       const handlebranchelect = (label: string, value: string) => {
//         setSelectedbranch(value);
//       };
//       const handlesectionselect = (label: string, value: string) => {
//         setSelectedsection(value);
//       };
//       const handleCoursefSelect = (label: string, value: string) => {
//         setSelectedCourseIdf(value);
//       };
//       const handlebranchfelect = (label: string, value: string) => {
//         setSelectedbranchf(value);
//       };
//   return (
//    <>
//    <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedSchoolId} />
//    <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedCourseId} orgid={selectedSchoolId} />
//    <Departmentdp  onSelectbranch={handlebranchelect} selectedbranch={selectedbranch} courseid={selectedCourseId}/>
//    <YearDp onSelectYear={handleyearSelect} selectedYear={selectedyear} courseid={parseInt(selectedCourseId)}/>
//    <SemDp  onSelectSem={handlesemSelect} selectedSem={selectedsem} courseid={parseInt(selectedCourseId)}/>
//    <SectionDp  onSelectSection={handlesectionselect} selectedSection={selectedsection} branchId={selectedbranch}/>
//    <FCoursedp onSelectcourse={handleCoursefSelect} selectedcourse={selectedCourseIdf} orgid={selectedSchoolId} />
//    <Fdepartmentdp onSelectbranch={handlebranchfelect} selectedbranch={selectedbranchf} courseid={selectedCourseIdf}/>
//    </>
//   )
// }

// export default page

// pages/index.js
"use client"
import React from 'react';
import DynamicTable from '@/components/table/DynamicTable';
import ExcelTabs from '@/components/ExcelTabs';
const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Student Grades Pivot Table</h1>
      <ExcelTabs />
    </div>
  );
};

export default HomePage;

