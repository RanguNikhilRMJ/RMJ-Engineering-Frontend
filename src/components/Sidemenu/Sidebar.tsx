import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListItemIcon from '@mui/material/ListItemIcon'; // Added this import
import GradingIcon from '@mui/icons-material/Grading';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
interface MenuItem {
  label: string;
  path: string;
  subMenu?: MenuItem[];
  icon?: any;
 
}
 
const staticMenuDataprincipal: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/Dashboard',
    // subMenu: [{ label: 'Dashboard', path: '/Dashboard' }],
    icon: <HomeIcon />, // Added icon
 
  },
  {
    label: 'Academic',
    path: '',
    icon: <SchoolIcon />, // Added icon
 
    subMenu: [
      { label: 'Academic Calander', path: '/Academics/AcademicCalander' },
      { label: 'Course Objectives', path: '/Academics/CourseObjectives' },
      { label: 'Course OutCome', path: '/Academics/CourseOutCome' },
      { label: 'Fee Structure', path: '/Academics/Feestructure' },
      { label: 'Post MidMarks', path: '/Academics/Midmarks/PostMidMarks' },
      { label: 'Sem Registration', path: '/Academics/SemRegistration' },
      { label: 'Subject Registration', path: '/Academics/SubjectRegistration' },
      { label: 'TTpost', path: '/Academics/TTpost' },
    ],
  },
  {
    label: 'Leaves',
    path: '',
    icon: <PaymentIcon />, // Added icon
 
    subMenu: [
      { label: 'Leave Approval', path: '/Academics/Leaves/LeaveApproval' },
      { label: 'Leaves Apply', path: '/Academics/Leaves/LeavesApply' },
    ],
  },
  {
    label: 'chairman Dashbord',
    path: '',
    subMenu: [
      { label: 'Chairman Dashbord', path: '/chairmanDashbord' },
    ],
 
  },
  {
    label: 'Timetable',
    path: '',
    subMenu: [
      { label: 'Timetable', path: '/Timetable/temp' },
      { label: 'Faculty Timetable', path: '/Timetable/temp/tempFaculty' },
 
    ],
 
  },
  {
    label: 'Results',  // Correct the spelling of 'results'
    path: '/results',
    icon: <GradingIcon />,  // You can choose a different icon if needed
  },
];
 
const staticMenuDatahod: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/Dashboard',
    // subMenu: [{ label: 'Dashboard', path: '/Dashboard' }],
    icon: <HomeIcon />, // Added icon
 
  },
  {
    label: 'Academic',
    path: '',
    icon: <SchoolIcon />, // Added icon
 
    subMenu: [
      { label: 'Academic Calander', path: '/Academics/AcademicCalander' },
      { label: 'Course Objectives', path: '/Academics/CourseObjectives' },
      { label: 'Course OutCome', path: '/Academics/CourseOutCome' },
      { label: 'Fee Structure', path: '/Academics/Feestructure' },
      { label: 'Post MidMarks', path: '/Academics/Midmarks/PostMidMarks' },
      { label: 'Sem Registration', path: '/Academics/SemRegistration' },
      { label: 'Subject Registration', path: '/Academics/SubjectRegistration' },
      { label: 'TTpost', path: '/Academics/TTpost' },
    ],
  },
  {
    label: 'Leaves',
    path: '',
    icon: <HomeIcon />, // Added icon
 
    subMenu: [
      { label: 'Leave Approval', path: '/Academics/Leaves/LeaveApproval' },
      { label: 'Leaves Apply', path: '/Academics/Leaves/LeavesApply' },
    ],
  },
  {
    label: 'Chairman Dashbord',
    path: '/chairmanDashbord',
 
 
  },
  {
    label: 'Timetable',
    path: '',
    icon: <HomeIcon />, // Added icon
 
    subMenu: [
      { label: 'Timetable', path: '/Timetable/temp' },
      { label: 'Faculty Timetable', path: '/Timetable/temp/tempFaculty' },
 
    ],
 
  },
  {
    label: 'Results',  // Correct the spelling of 'results'
    path: '/results',
    icon: <GradingIcon />,  // You can choose a different icon if needed
  },
];
 
const staticMenuDatafaculty: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/Dashboard',
    // subMenu: [{ label: 'Dashboard', path: '/Dashboard' }],
    icon: <HomeIcon />, // Added icon
 
  },
  {
    label: 'Leaves',
    path: '',
    icon: <TimelineIcon/>,
 
    subMenu: [
      { label: 'Leave Approval', path: '/Academics/Leaves/LeaveApproval' },
      { label: 'Leaves Apply', path: '/Academics/Leaves/LeavesApply' },
    ],
  },
  {
    label: 'Chairman Dashbord',
    path: '/chairmanDashbord',
    icon: <HomeIcon />, // Added icon
  },
  {
    label: 'Fee Module',
    path: '',
    icon: <PaymentIcon />, // Added icon
 
    subMenu: [
      { label: 'fee1', path: '/feereports1/fee1' },
      { label: 'fee2', path: '/feereports1/fee2' },
      { label: 'CAT-B', path: '/feereports1/CAT-B' },
      { label: 'Office Submissions', path: '/feereports1/OfficeSubmissions' },
      // { label: 'fee1', path: '/feereports1/fee' },
 
    ],
  },
  {
    label: 'Academic',
    path: '',
    icon: <SchoolIcon />, // Added icon
 
    subMenu: [
      { label: 'Academic Calander', path: '/Academics/AcademicCalander' },
      { label: 'Course Objectives', path: '/Academics/CourseObjectives' },
      { label: 'Course OutCome', path: '/Academics/CourseOutCome' },
      { label: 'Fee Structure', path: '/Academics/Feestructure' },
      { label: 'Post MidMarks', path: '/Academics/Midmarks/PostMidMarks' },
      { label: 'Sem Registration', path: '/Academics/SemRegistration' },
      { label: 'Subject Registration', path: '/Academics/SubjectRegistration' },
      { label: 'TTpost', path: '/Academics/TTpost' },
               
 
    ],
  },
  {
    label: 'Timetable',
    path: '',
    icon: <CalendarMonthIcon/>,
 
    subMenu: [
      { label: 'Timetable', path: '/Timetable/temp' },
      { label: 'Faculty Timetable', path: '/Timetable/temp/tempFaculty' },
    ],
 
  },
  {
    label: 'Results',  // Correct the spelling of 'results'
    path: '/results',
    icon: <GradingIcon />,  // You can choose a different icon if needed
 
  },
  {
    label: 'Infrastructure',  // Correct the spelling of 'results'
    path: '/Infrastructure',
    icon: <ApartmentIcon />,  // You can choose a different icon if needed
 
  },
  {
    label: 'Hostal Attendance',  // Correct the spelling of 'results'
    path: '/hostalAttendance',
    icon: <ListAltIcon />,  // You can choose a different icon if needed
 
  },
  {
    label: 'CERTIFICATE',  // Correct the spelling of 'results'
    path: '',
    icon: <DescriptionIcon />,  // You can choose a different icon if needed
    subMenu: [
      { label: 'Bonafide Certificate', path: '/certificate/bonafied' },
      { label: 'Transfer Certificate', path: '/certificate/TransferCertificate' },
      { label: 'Study Conduct Certificate', path: '/certificate/studyCertificate'},
      { label: 'Incomtax', path: '' },
    ],
  },
];
 
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [filteredMenuData, setFilteredMenuData] = useState<MenuItem[]>([]);
 
  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    let menuData: MenuItem[] = [];
 
    if (usertype === 'Principal') {
      menuData = staticMenuDatafaculty;
    } else if (usertype === 'hod') {
      menuData = staticMenuDatafaculty;
    } else {
      menuData = staticMenuDatafaculty;
    }
    setFilteredMenuData(menuData);
  }, []);
 
  const handleClickSubMenu = (label: string) => {
    setOpenSubMenus((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]));
  };
 
  const renderSubMenu = (subMenu: MenuItem[] | undefined, parentLabel: string) => {
    if (!subMenu) return null;
 
    return (
      <Collapse in={openSubMenus.includes(parentLabel)} timeout="auto" unmountOnExit>
      <div>
        {subMenu.map((item) => (
          <Link href={item.path} key={item.label} style={{ textDecoration: 'none', width: '100%' }}>
            <ListItem button style={{ padding: '10px', width: '100%' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'white', marginLeft: '10px' }} />
              <ListItemText primary={item.label} sx={{ color: 'white', marginLeft: '10px' }} />
            </ListItem>
          </Link>
        ))}
      </div>
    </Collapse>
    );
  };
 
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List style={{ backgroundColor: '#374151', color: 'white' }}>
        <ListItem button>
          <ListItemText primary="Menu Bar" />
          <MenuIcon />
        </ListItem>
 
        {filteredMenuData.map((menuItem) => (
  <React.Fragment key={menuItem.label}>
    {menuItem.subMenu ? (
      <>
        <ListItem button onClick={() => handleClickSubMenu(menuItem.label)}>
          <ListItemIcon sx={{ color: 'white' }}>{menuItem.icon}</ListItemIcon> {/* Added ListItemIcon to show the icon */}
          <ListItemText primary={menuItem.label} />
          {openSubMenus.includes(menuItem.label) ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {renderSubMenu(menuItem.subMenu, menuItem.label)}
      </>
    ) : (
      <Link href={menuItem.path} style={{ textDecoration: 'none', color: 'white', display: "flex" }}>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>{menuItem.icon}</ListItemIcon> {/* Added ListItemIcon for items without submenus */}
          <ListItemText primary={menuItem.label} />
        </ListItem>
      </Link>
    )}
  </React.Fragment>
))}
 
      </List>
    </Drawer>
  );
};
 
export default Sidebar;