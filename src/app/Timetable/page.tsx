
// "use client"
// import React from 'react'
// import { Typography } from '@mui/material';
// import Timetable from '@/components/timeTableComponents/timetable'
// import Layout from '@/components/Sidemenu/Layout'
// import { Box } from '@mui/material';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// function page() {
//     const [value, setValue] = React.useState('1');

//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//       setValue(newValue);
//     };
//     const timetableData = [
//       {
//         "CIVIL": {
//             "A": {
//                 "Monday": "Period 1 : Dr SYED AFZAL BASHA - Gender Sensitization; Period 2 : M Lokanath Reddy - Environmental Engineering Lab; Period 3 : T SUHARIKA PAUL - Engineering Geology; Period 4 : C.G.MOHAN BABU - Design & Drawing of Reinforced Concrete Structures; Period 5 : C.G.MOHAN BABU - Design & Drawing of Reinforced Concrete Structures; Period 6 : C.G.MOHAN BABU - Design & Drawing of Reinforced Concrete Structures",
//                 "Thursday": "Period 1 : Dr SYED AFZAL BASHA - Gender Sensitization; Period 2 : C BALA HUSSAINY - Geotechnical Engineering; Period 3 : M Lokanath Reddy - Environmental Engineering Lab; Period 4 : M Lokanath Reddy - Environmental Engineering; Period 5 : M Lokanath Reddy - Environmental Engineering; Period 6 : M Lokanath Reddy - Environmental Engineering Lab",
//                 "Friday": "Period 1 : C BALA HUSSAINY - Soil Mechanics Lab; Period 2 : C BALA HUSSAINY - INTRODUCTION TO INTERNET OF THINGS; Period 3 : T SUHARIKA PAUL - Engineering Geology; Period 4 : M Lokanath Reddy - Environmental Engineering Lab; Period 5 : M Lokanath Reddy - Environmental Engineering Lab; Period 6 : T SUHARIKA PAUL - Engineering Geology",
//                 "Wednesday": "Period 1 : S AKHIL TEJ - Construction Planning and Project Management; Period 2 : C BALA HUSSAINY - Soil Mechanics Lab; Period 3 : T SUHARIKA PAUL - Engineering Geology; Period 4 : Dr SYED AFZAL BASHA - Gender Sensitization; Period 5 : S AKHIL TEJ - Construction Planning and Project Management; Period 6 : T SUHARIKA PAUL - Engineering Geology",
//                 "Tuesday": "Period 1 : Dr SYED AFZAL BASHA - Gender Sensitization; Period 2 : M Lokanath Reddy - Environmental Engineering Lab; Period 3 : M Lokanath Reddy - Environmental Engineering Lab; Period 4 : S AKHIL TEJ - Construction Planning and Project Management; Period 5 : C BALA HUSSAINY - Soil Mechanics Lab; Period 6 : C BALA HUSSAINY - Soil Mechanics Lab",
//                 "Saturday": "Period 1 : M Lokanath Reddy - Environmental Engineering; Period 2 : S AKHIL TEJ - Construction Planning and Project Management; Period 3 : T SUHARIKA PAUL - Engineering Geology; Period 4 : Dr SYED AFZAL BASHA - Gender Sensitization; Period 5 : M Lokanath Reddy - Environmental Engineering Lab; Period 6 : M Lokanath Reddy - Environmental Engineering Lab"
//             }
//         },
//         "CSE": {
//             "A": {
//                 "Monday": "Period 1 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 2 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : V Lilly Grace - INTRODUCTION TO IOT; Period 5 : T N BALAKRISHNA - R PROGRAMMING; Period 6 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE",
//                 "Thursday": "Period 1 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 2 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 3 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 4 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 5 : T N BALAKRISHNA - R PROGRAMMING; Period 6 : K MANJUSHA - GENDER SENSITIZATION",
//                 "Friday": "Period 1 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 2 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 5 : T N BALAKRISHNA - R PROGRAMMING; Period 6 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE",
//                 "Wednesday": "Period 1 : K MANJUSHA - GENDER SENSITIZATION; Period 2 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 3 : K MANJUSHA - GENDER SENSITIZATION; Period 4 : V Lilly Grace - INTRODUCTION TO IOT; Period 5 : K MANJUSHA - GENDER SENSITIZATION; Period 6 : V Vijaya Chandra Rao - ETHICAL HACKING-1",
//                 "Tuesday": "Period 1 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 2 : V Lilly Grace - INTRODUCTION TO IOT; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 5 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 6 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE",
//                 "Saturday": "Period 1 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 2 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : C K Indira - MOBILE APPLICATION DEVELOPMENT; Period 5 : K MANJUSHA - GENDER SENSITIZATION; Period 6 : C K Indira - MOBILE APPLICATION DEVELOPMENT"
//             },
//             "B": {
//                 "Monday": "Period 1 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 2 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : T N BALAKRISHNA - R PROGRAMMING; Period 5 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 6 : T N BALAKRISHNA - R PROGRAMMING",
//                 "Thursday": "Period 1 : V Lilly Grace - INTRODUCTION TO IOT; Period 2 : V Lilly Grace - INTRODUCTION TO IOT; Period 3 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 4 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 5 : DR M.SRI LAKSHMI - COMPUTER NETWORKS; Period 6 : V Vijaya Chandra Rao - ETHICAL HACKING-1",
//                 "Friday": "Period 1 : C K Indira - MOBILE APPLICATION DEVELOPMENT; Period 2 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 3 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 4 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 5 : V Lilly Grace - INTRODUCTION TO IOT; Period 6 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB",
//                 "Wednesday": "Period 1 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 2 : K MANJUSHA - GENDER SENSITIZATION; Period 3 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 4 : V Lilly Grace - INTRODUCTION TO IOT; Period 5 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 6 : K MANJUSHA - GENDER SENSITIZATION",
//                 "Tuesday": "Period 1 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 2 : C K Indira - MOBILE APPLICATION DEVELOPMENT; Period 3 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 4 : K MANJUSHA - GENDER SENSITIZATION; Period 5 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB; Period 6 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS",
//                 "Saturday": "Period 1 : D.Jayanarayana Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 2 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : T N BALAKRISHNA - R PROGRAMMING; Period 5 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 6 : C K Indira - MOBILE APPLICATION DEVELOPMENT LAB"
//             },
//             "C": {
//                 "Monday": "Period 1 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 2 : T N BALAKRISHNA - R PROGRAMMING; Period 3 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 4 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE; Period 5 : T N BALAKRISHNA - R PROGRAMMING; Period 6 : T N BALAKRISHNA - R PROGRAMMING",
//                 "Thursday": "Period 1 : V Lilly Grace - INTRODUCTION TO IOT; Period 2 : V Lilly Grace - INTRODUCTION TO IOT; Period 3 : V Lilly Grace - INTRODUCTION TO IOT; Period 4 : T N BALAKRISHNA - R PROGRAMMING; Period 5 : T N BALAKRISHNA - R PROGRAMMING; Period 6 : B. Sowjanya - MOBILE APPLICATION DEVELOPMENT",
//                 "Friday": "Period 1 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE; Period 2 : T N BALAKRISHNA - R PROGRAMMING; Period 3 : T N BALAKRISHNA - R PROGRAMMING; Period 4 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE; Period 5 : V Lilly Grace - INTRODUCTION TO IOT; Period 6 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE LAB",
//                 "Wednesday": "Period 1 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 2 : K MANJUSHA - GENDER SENSITIZATION; Period 3 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 4 : K MANJUSHA - GENDER SENSITIZATION; Period 5 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 6 : K MANJUSHA - GENDER SENSITIZATION",
//                 "Tuesday": "Period 1 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 2 : B. Sowjanya - MOBILE APPLICATION DEVELOPMENT; Period 3 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE LAB; Period 4 : B. Sowjanya - MOBILE APPLICATION DEVELOPMENT; Period 5 : V Vijaya Chandra Rao - ETHICAL HACKING-1; Period 6 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE LAB",
//                 "Saturday": "Period 1 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 2 : M JAYA SUNITHA - ARTIFICIAL INTELLIGENCE LAB; Period 3 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 4 : T N BALAKRISHNA - R PROGRAMMING; Period 5 : B. Sowjanya - MOBILE APPLICATION DEVELOPMENT LAB; Period 6 : T N BALAKRISHNA - R PROGRAMMING"
//             }
//         },
//         "EEE": {
//             "A": {
//                 "Monday": "Period 1 : MEESALA VENKATESWARLU - Power Electronics Laboratory; Period 2 : Dr. A. Suresh Kumar - Electrical Measurements and Instrumentation; Period 3 : KARANAM DEEPAK - Smart Grid: Basics to Advanced Tchnologies; Period 4 : S SANKARA PRASAD - Power System Transmission and Distribution; Period 5 : Dr.M.Rama Prasad Reddy - Power Electronics; Period 6 : Dr. A. Suresh Kumar - Electrical Measurements and Instrumentation Laboratory",
//                 "Thursday": "Period 1 : Y. Sai Indira priyadarshini - Skill advanced course (JAVA Programming Laboratory); Period 2 : Y. Sai Indira priyadarshini - Skill advanced course (JAVA Programming Laboratory); Period 3 : Y. Sai Indira priyadarshini - Skill advanced course (JAVA Programming Laboratory); Period 4 : KARANAM DEEPAK - Smart Grid: Basics to Advanced Tchnologies; Period 5 : MEESALA VENKATESWARLU - Power Electronics Laboratory; Period 6 : S SANKARA PRASAD - Electrical Measurements and Instrumentation Laboratory",
//                 "Friday": "Period 1 : Dr.G.PANDU RANGA REDDY - Introduction to IoT; Period 2 : S SANKARA PRASAD - Power System Transmission and Distribution; Period 3 : S SANKARA PRASAD - Electrical Measurements and Instrumentation Laboratory; Period 4 : Dr.M.Rama Prasad Reddy - Power Electronics Laboratory; Period 5 : Dr.M.Rama Prasad Reddy - Power Electronics; Period 6 : Dr.M.Rama Prasad Reddy - Power Electronics",
//                 "Wednesday": "Period 1 : Dr. A. Suresh Kumar - Electrical Measurements and Instrumentation; Period 2 : S SANKARA PRASAD - Electrical Measurements and Instrumentation Laboratory; Period 3 : S SANKARA PRASAD - Power System Transmission and Distribution; Period 4 : KARANAM DEEPAK - Smart Grid: Basics to Advanced Tchnologies; Period 5 : Dr.M.Rama Prasad Reddy - Power Electronics Laboratory; Period 6 : KARANAM DEEPAK - Smart Grid: Basics to Advanced Tchnologies",
//                 "Tuesday": "Period 1 : Dr.G.PANDU RANGA REDDY - Skill advanced course (JAVA Programming Laboratory); Period 2 : MEESALA VENKATESWARLU - Power Electronics Laboratory; Period 3 : MEESALA VENKATESWARLU - Power Electronics Laboratory; Period 4 : Dr.G.PANDU RANGA REDDY - SI Training; Period 5 : Dr.G.PANDU RANGA REDDY - SI Training; Period 6 : Dr.M.Rama Prasad Reddy - Power Electronics Laboratory",
//                 "Saturday": "Period 1 : S SANKARA PRASAD - Electrical Measurements and Instrumentation Laboratory; Period 2 : Dr.G.PANDU RANGA REDDY - Introduction to IoT; Period 3 : KARANAM DEEPAK - Smart Grid: Basics to Advanced Tchnologies; Period 4 : Dr.M.Rama Prasad Reddy - Power Electronics; Period 5 : Dr.G.PANDU RANGA REDDY - Introduction to IoT; Period 6 : Dr.G.PANDU RANGA REDDY - Introduction to IoT"
//             }
//         },
//         "CSE-D": {
//             "A": {
//                 "Monday": "Period 1 : N Somanna - DATA MANAGEMENT TECHINIQUES LAB; Period 2 : T Suvika Paul - GENDER SENSITIZATION; Period 3 : V Divakar Naidu - E-BUSINESS; Period 4 : N Somanna - DATA MANAGEMENT TECHINIQUES; Period 5 : N S Swapna - ARTIFICIAL INTELLIGENCE LAB; Period 6 : M JAYA BABU - FULL STACK DEVELOPEMENT LAB",
//                 "Thursday": "Period 1 : T Suvika Paul - GENDER SENSITIZATION; Period 2 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 3 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 4 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 5 : K Vinod Kumar Reddy - ADVANCE R PROGRAMING; Period 6 : Dr. M JANARDHAN - FOUNDATIONS OF DATA ANALYTICS",
//                 "Friday": "Period 1 : K Vinod Kumar Reddy - ADVANCE R PROGRAMING; Period 2 : Dr. M JANARDHAN - FOUNDATIONS OF DATA ANALYTICS; Period 3 : K Vinod Kumar Reddy - ADVANCE R PROGRAMING; Period 4 : T Suvika Paul - GENDER SENSITIZATION; Period 5 : M JAYA BABU - TRAINING; Period 6 : N Somanna - DATA MANAGEMENT TECHINIQUES LAB",
//                 "Wednesday": "Period 1 : T Suvika Paul - GENDER SENSITIZATION; Period 2 : M JAYA BABU - FULL STACK DEVELOPEMENT LAB; Period 3 : V Divakar Naidu - E-BUSINESS; Period 4 : V Divakar Naidu - E-BUSINESS; Period 5 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 6 : MD Asim - JOY OF COMPUTING USING PYTHON",
//                 "Tuesday": "Period 1 : N Somanna - DATA MANAGEMENT TECHINIQUES LAB; Period 2 : N S Swapna - ARTIFICIAL INTELLIGENCE LAB; Period 3 : Dr. M JANARDHAN - FOUNDATIONS OF DATA ANALYTICS; Period 4 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 5 : M JAYA BABU - FULL STACK DEVELOPEMENT LAB; Period 6 : N S Swapna - FOUNDATIONS OF ARTIFICIAL INTELLIGENCE",
//                 "Saturday": "Period 1 : M JAYA BABU - FULL STACK DEVELOPEMENT LAB; Period 2 : N Somanna - DATA MANAGEMENT TECHINIQUES LAB; Period 3 : Dr. M JANARDHAN - FOUNDATIONS OF DATA ANALYTICS; Period 4 : N Somanna - DATA MANAGEMENT TECHINIQUES; Period 5 : N S Swapna - FOUNDATIONS OF ARTIFICIAL INTELLIGENCE; Period 6 : MD Asim - JOY OF COMPUTING USING PYTHON"
//             }
//         },
//         "ECE": {
//             "A": {
//                 "Monday": "Period 1 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 2 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 3 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 4 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS LAB; Period 5 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS LAB; Period 6 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY",
//                 "Thursday": "Period 1 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 2 : C LOKANATH REDDY - PYTHON FULL STACK; Period 3 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 4 : ALLURU SREEVANI - TRAINING; Period 5 : ALLURU SREEVANI - TRAINING; Period 6 : ALLURU SREEVANI - TRAINING",
//                 "Friday": "Period 1 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 2 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 3 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 4 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 5 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 6 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION",
//                 "Wednesday": "Period 1 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 2 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 3 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 4 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 5 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 6 : C LOKANATH REDDY - PYTHON FULL STACK",
//                 "Tuesday": "Period 1 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 2 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY; Period 3 : C LOKANATH REDDY - PYTHON FULL STACK; Period 4 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 5 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 6 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS",
//                 "Saturday": "Period 1 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 2 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 3 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY; Period 4 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 5 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 6 : C LOKANATH REDDY - PYTHON FULL STACK"
//             },
//             "B": {
//                 "Monday": "Period 1 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 2 : Dr. B RAVI CHANDRA - DIGITAL COMMUNICATION SYSTEMS; Period 3 : C LOKANATH REDDY - TRAINING; Period 4 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 5 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 6 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB",
//                 "Thursday": "Period 1 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY; Period 2 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 3 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 4 : Dr. B RAVI CHANDRA - DIGITAL COMMUNICATION SYSTEMS; Period 5 : Dr. B RAVI CHANDRA - DIGITAL COMMUNICATION SYSTEMS; Period 6 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY",
//                 "Friday": "Period 1 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 2 : DR. K.C.T.SWAMY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 3 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 4 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 5 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 6 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS",
//                 "Wednesday": "Period 1 : C LOKANATH REDDY - PYTHON FULL STACK; Period 2 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY; Period 3 : DR. K.C.T.SWAMY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 4 : DR. K.C.T.SWAMY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 5 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 6 : V Supraja - INTRODUCTION TO INTERNET OF THINGS",
//                 "Tuesday": "Period 1 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 2 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 3 : C LOKANATH REDDY - TRAINING; Period 4 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 5 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 6 : V Supraja - INTRODUCTION TO INTERNET OF THINGS",
//                 "Saturday": "Period 1 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 2 : DR. K.C.T.SWAMY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 3 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 4 : DR. K.C.T.SWAMY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 5 : Dr. B RAVI CHANDRA - DIGITAL COMMUNICATION SYSTEMS; Period 6 : Dr. B RAVI CHANDRA - DIGITAL COMMUNICATION SYSTEMS"
//             },
//             "C": {
//                 "Monday": "Period 1 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 2 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 3 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 4 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 5 : C LOKANATH REDDY - PYTHON FULL STACK; Period 6 : V Supraja - INTRODUCTION TO INTERNET OF THINGS",
//                 "Thursday": "Period 1 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 2 : YEDDULAMALA BHANU PRIYA - TRAINING; Period 3 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 4 : MADDIKERA KRISHNA REDDY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 5 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 6 : VANDAVASI PRIYANKA - INDIAN CONSTUTION",
//                 "Friday": "Period 1 : VANDAVASI PRIYANKA - INDIAN CONSTUTION; Period 2 : YEDDULAMALA BHANU PRIYA - TRAINING; Period 3 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 4 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS; Period 5 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 6 : Dr N Geetha Rani - SOCIAL NETWORK ANALYSIS",
//                 "Wednesday": "Period 1 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY; Period 2 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 3 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 4 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 5 : G RAMARAO - LINEAR INTEGRATED CIRCUIT APPLICATIONS; Period 6 : C LOKANATH REDDY - PYTHON FULL STACK",
//                 "Tuesday": "Period 1 : YEDDULAMALA BHANU PRIYA - TRAINING; Period 2 : C LOKANATH REDDY - PYTHON FULL STACK; Period 3 : V Supraja - INTRODUCTION TO INTERNET OF THINGS; Period 4 : MADDIKERA KRISHNA REDDY - DIGITAL COMMUNICATION SYSTEMS LAB; Period 5 : Syed Ishrath Moin - LINEAR INTEGRATED CIRCUIT APPLICATIONS LAB; Period 6 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS",
//                 "Saturday": "Period 1 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 2 : DR. K.C.T.SWAMY - ANTENNAS & WAVE PROPAGATION; Period 3 : T Kishore - FUNDAMENTALS OF MICRO & NANO FABRICATION; Period 4 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 5 : S Fowzia Sultana - DIGITAL COMMUNICATION SYSTEMS; Period 6 : MADDIKERA KRISHNA REDDY - FIBER OPTIC COMMUNICATION TECHNOLOGY"
//             }
//         },
//         "MECHINACAL": {
//             "A": {
//                 "Monday": "Period 1 : K.CHINNA VEERESH - Machine Tools Lab; Period 2 : Dr G Praveen Kumar - CAD/CAM Lab; Period 3 : Dr K  Mallikarjuna - Dynamics of Machinery; Period 4 : Dr C Naga Kumar - Machine Drawing Practice; Period 5 : Dr C Naga Kumar - Machine Drawing Practice; Period 6 : Dr G Praveen Kumar - CAD/CAM Lab",
//                 "Thursday": "Period 1 : Katika Khaja Hussain - Work System Design; Period 2 : Dr K  Mallikarjuna - Dynamics of Machinery; Period 3 : Katika Khaja Hussain - Work System Design; Period 4 : Dr G Praveen Kumar - CAD/CAM Lab; Period 5 : Dr C Naga Kumar - Machine Drawing Practice; Period 6 : M. NAGARAJU - Thermal Engineering",
//                 "Friday": "Period 1 : Dr G Praveen Kumar - CAD/CAM Lab; Period 2 : M. NAGARAJU - Gender Sensitization; Period 3 : M. NAGARAJU - Gender Sensitization; Period 4 : Dr G Praveen Kumar - CAD/CAM Lab; Period 5 : Katika Khaja Hussain - Work System Design; Period 6 : A RAMANJANEYA REDDY - Design of Machine Elements",
//                 "Wednesday": "Period 1 : M. NAGARAJU - Thermal Engineering; Period 2 : Dr C Naga Kumar - Machine Drawing Practice; Period 3 : K.CHINNA VEERESH - Machine Tools Lab; Period 4 : A RAMANJANEYA REDDY - Design of Machine Elements; Period 5 : K.CHINNA VEERESH - Machine Tools Lab; Period 6 : A RAMANJANEYA REDDY - Design of Machine Elements",
//                 "Tuesday": "Period 1 : M. NAGARAJU - Gender Sensitization; Period 2 : A RAMANJANEYA REDDY - Design of Machine Elements; Period 3 : Dr K  Mallikarjuna - Dynamics of Machinery; Period 4 : Dr G Praveen Kumar - core- training; Period 5 : M. NAGARAJU - Thermal Engineering; Period 6 : Katika Khaja Hussain - Work System Design",
//                 "Saturday": "Period 1 : K.CHINNA VEERESH - Machine Tools Lab; Period 2 : M. NAGARAJU - Gender Sensitization; Period 3 : Dr C Naga Kumar - Machine Drawing Practice; Period 4 : Dr C Naga Kumar - Machine Drawing Practice; Period 5 : Dr K  Mallikarjuna - Dynamics of Machinery; Period 6 : M. NAGARAJU - Gender Sensitization"
//             }
//         },
//         "CAE-I": {
//             "A": {
//                 "Monday": "Period 1 : K Vinod Kumar Reddy - Advance R Programing; Period 2 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 3 : B Swarajya Lakshmi - Machine Learning; Period 4 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 5 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 6 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB",
//                 "Thursday": "Period 1 : N S Swapna - TRAINING; Period 2 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 3 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 4 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 5 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 6 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE",
//                 "Friday": "Period 1 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 2 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 3 : V Divakar Naidu - E-BUSINESS; Period 4 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 5 : V Divakar Naidu - E-BUSINESS; Period 6 : V Divakar Naidu - E-BUSINESS",
//                 "Wednesday": "Period 1 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 2 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 3 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 4 : T Suvika Paul - Gender Sensitization; Period 5 : T Suvika Paul - Gender Sensitization; Period 6 : N S Swapna - TRAINING",
//                 "Tuesday": "Period 1 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 2 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 3 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 4 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 5 : T Suvika Paul - Gender Sensitization; Period 6 : N S Swapna - TRAINING",
//                 "Saturday": "Period 1 : T Suvika Paul - Gender Sensitization; Period 2 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 3 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 4 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 5 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 6 : V Divakar Naidu - E-BUSINESS"
//             },
//             "B": {
//                 "Monday": "Period 1 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 2 : B Swarajya Lakshmi - TRAINING; Period 3 : B Swarajya Lakshmi - Machine Learning; Period 4 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 5 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 6 : T Suvika Paul - Gender Sensitization",
//                 "Thursday": "Period 1 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 2 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 3 : T Suvika Paul - Gender Sensitization; Period 4 : V Divakar Naidu - E-BUSINESS; Period 5 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 6 : MD Asim - JOY OF COMPUTING USING PYTHON",
//                 "Friday": "Period 1 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 2 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 3 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 4 : B Swarajya Lakshmi - Machine Learning; Period 5 : K Vinod Kumar Reddy - ARTIFICIAL INTELLIGENCE LAB; Period 6 : T Suvika Paul - Gender Sensitization",
//                 "Wednesday": "Period 1 : B Swarajya Lakshmi - Machine Learning; Period 2 : V Divakar Naidu - E-BUSINESS; Period 3 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 4 : PERUMALLA SUMAN PRAKASH - Theory of Computation& Compiler Design; Period 5 : K Vinod Kumar Reddy - Advance R Programing; Period 6 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS",
//                 "Tuesday": "Period 1 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 2 : Dr D Veerabhadra Babu - WEB APPLICATION DEVELOPEMENT LAB; Period 3 : T Suvika Paul - Gender Sensitization; Period 4 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 5 : V Divakar Naidu - E-BUSINESS; Period 6 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS",
//                 "Saturday": "Period 1 : V Divakar Naidu - E-BUSINESS; Period 2 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 3 : B Swarajya Lakshmi - MACHINE LEARNING LAB; Period 4 : B Swarajya Lakshmi - Machine Learning; Period 5 : SANDHYARANI KURUVA - ARTIFICIAL INTELLIGENCE; Period 6 : B Swarajya Lakshmi - MACHINE LEARNING LAB"
//             }
//         },
//         "CSM": {
//             "A": {
//                 "Monday": "Period 1 : B.ROJA RAMANI - CYBER SECURITY AND PRIVACY; Period 2 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 3 : T N BALAKRISHNA - THE JOY OF COMPUTING USING PYTHON; Period 4 : V Vijaya Chandra Rao - BIG DATA ANALYTICS LAB; Period 5 : V Vijaya Chandra Rao - BIG DATA ANALYTICS LAB; Period 6 : V Vijaya Chandra Rao - ETHICAL HACKING-1",
//                 "Thursday": "Period 1 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 2 : B.DEENA DIVYA NAYOMI - WEB TECHNOLOGIES LAB; Period 3 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 4 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM LAB; Period 5 : V Vijaya Chandra Rao - BIG DATA ANALYTICS LAB; Period 6 : V Vijaya Chandra Rao - ETHICAL HACKING-1",
//                 "Friday": "Period 1 : V Vijaya Chandra Rao - BIG DATA ANALYTICS LAB; Period 2 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 3 : V Vijaya Chandra Rao - BIG DATA ANALYTICS LAB; Period 4 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM; Period 5 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM; Period 6 : B.DEENA DIVYA NAYOMI - WEB TECHNOLOGIES LAB",
//                 "Wednesday": "Period 1 : V Lilly Grace - GENDER SENSITIZATION; Period 2 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 3 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 4 : V Lilly Grace - INTRODUCTION TO IOT; Period 5 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM; Period 6 : B.DEENA DIVYA NAYOMI - WEB TECHNOLOGIES LAB",
//                 "Tuesday": "Period 1 : T N BALAKRISHNA - THE JOY OF COMPUTING USING PYTHON; Period 2 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM; Period 3 : B.DEENA DIVYA NAYOMI - WEB TECHNOLOGIES LAB; Period 4 : V Lilly Grace - GENDER SENSITIZATION; Period 5 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM LAB; Period 6 : T N BALAKRISHNA - THE JOY OF COMPUTING USING PYTHON",
//                 "Saturday": "Period 1 : T N BALAKRISHNA - THE JOY OF COMPUTING USING PYTHON; Period 2 : B.ROJA RAMANI - COMPUTER NETWORKS; Period 3 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM LAB; Period 4 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS; Period 5 : M JAYA SUNITHA - DESIGN AND ANALYSIS OF ALGORITHM; Period 6 : B. Sowjanya - MANAGEMENT INFORMATION SYSTEMS"
//             }
//         },
//         "CSO": {
//             "A": {
//                 "Monday": "Period 1 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT LAB; Period 2 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT; Period 3 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 4 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT LAB; Period 5 : M JAYA BABU - IoT SYSTEM DEVELOPEMENT LAB; Period 6 : M JAYA BABU - IoT SYSTEM DEVELOPEMENT LAB",
//                 "Thursday": "Period 1 : V Divakar Naidu - E-BUSINESS; Period 2 : T Suvika Paul - Gender Sensitization; Period 3 : T Suvika Paul - Gender Sensitization; Period 4 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT; Period 5 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 6 : MD Asim - JOY OF COMPUTING USING PYTHON",
//                 "Friday": "Period 1 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 2 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 3 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 4 : V Divakar Naidu - E-BUSINESS; Period 5 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 6 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT LAB",
//                 "Wednesday": "Period 1 : MD Asim - TRAINING; Period 2 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 3 : V Divakar Naidu - E-BUSINESS; Period 4 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 5 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 6 : T Suvika Paul - Gender Sensitization",
//                 "Tuesday": "Period 1 : M JAYA BABU - IoT SYSTEM DEVELOPEMENT LAB; Period 2 : MD Asim - TRAINING; Period 3 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 4 : MD Asim - JOY OF COMPUTING USING PYTHON; Period 5 : N Somanna - WEB APPLICATION DEVELOPEMENT LAB; Period 6 : V Divakar Naidu - E-BUSINESS",
//                 "Saturday": "Period 1 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT LAB; Period 2 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT; Period 3 : M GOPINATH REDDY - MANAGEMENT INFORMATION  SYSTEMS; Period 4 : T Suvika Paul - Gender Sensitization; Period 5 : N Somanna - WIRELESS SENSOR NETWORKS; Period 6 : P VISHNU KUMAR - IoT SYSTEM DEVELOPEMENT"
//             }
//         }
//     }
     
//       ]
//   return (
// <>
// <Layout>
// <Box sx={{ margin: 2 }}>
// <Typography variant="h5" component="h1" sx={{fontWeight:"bold"}} gutterBottom>
//   Student Timetable
// </Typography>
// <Typography variant="body1" paragraph>
//   Access your class schedule and important dates below. Stay organized and plan your academic activities throughout the semester.
// </Typography>

//     </Box>
//         <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//           <Tab  label="CES"  value="1"  sx={{fontWeight:"bold"}} />
//           <Tab  label="ECE" value="2" sx={{fontWeight:"bold"}}   />
//           <Tab  label="Civil" value="3" sx={{fontWeight:"bold"}}   />
//           <Tab  label="Mechinacal" value="4" sx={{fontWeight:"bold"}}   />
//           <Tab  label="EEE" value="5" sx={{fontWeight:"bold"}}   />

//           </TabList>
//         </Box>
//         <TabPanel value="1">   
//         <Timetable timetableData={timetableData} />  {/* Pass the data as props */}
//         </TabPanel >
//         <TabPanel value="2">   
//         <Timetable timetableData={timetableData} />  {/* Pass the data as props */}
//         </TabPanel >
//         <TabPanel value="3">   
//         <Timetable timetableData={timetableData} />  {/* Pass the data as props */}
//         </TabPanel >

//         <TabPanel value="4">   
//         <Timetable timetableData={timetableData} />  {/* Pass the data as props */}
//         </TabPanel >

//         <TabPanel value="5">   
//         <Timetable timetableData={timetableData} />  {/* Pass the data as props */}
//         </TabPanel >


//         </TabContext>
//     </Box>

// </Layout>

// </>
//       )
// }

// export default page

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page