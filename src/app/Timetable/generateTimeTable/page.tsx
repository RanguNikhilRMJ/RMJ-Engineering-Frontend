"use client"
import { useState } from 'react'
import { Typography,TextField,Grid,Box, Select, MenuItem, FormControl, InputLabel, Button  } from '@mui/material';
import Timetable from '@/components/timeTableComponents/timetable'
import Layout from '@/components/Sidemenu/Layout'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomButton from '@/utils/CustomButton'

function page() {
    const [value, setValue] = useState('1');
    const [formData, setFormData] = useState({
      academicYear: "",
      semester: "",
    });
    const [showTable, setShowTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [timetableData,settimetableData] = useState([
      {
        "CIVIL": {
            "A": {
            "Monday": [
                {
                    "period": "Period 1",
                    "instructor": "ameer1",
                    "subject": "Gender Sensitization"
                },
                {
                    "period": "Period 2",
                    "instructor": "ameer12",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 3",
                    "instructor": "ameer3",
                    "subject": "Engineering Geology"
                },
                {
                    "period": "Period 4",
                    "instructor": "ameer4",
                    "subject": "Design & Drawing of Reinforced Concrete Structures"
                },
                {
                    "period": "Period 5",
                    "instructor": "ameer5",
                    "subject": "Design & Drawing of Reinforced Concrete Structures"
                },
                {
                    "period": "Period 6",
                    "instructor": "ameer6",
                    "subject": "Design & Drawing of Reinforced Concrete Structures"
                }
            ],
            "Tuesday": [
                {
                    "period": "Period 1",
                    "instructor": "ameer7",
                    "subject": "Gender Sensitization"
                },
                {
                    "period": "Period 2",
                    "instructor": "ameer8",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 3",
                    "instructor": "ameer9",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 4",
                    "instructor": "ameer10",
                    "subject": "Construction Planning and Project Management"
                },
                {
                    "period": "Period 5",
                    "instructor": "ameer11",
                    "subject": "Soil Mechanics Lab"
                },
                {
                    "period": "Period 6",
                    "instructor": "ameer12",
                    "subject": "Soil Mechanics Lab"
                }
            ],
            "Wednesday": [
                {
                    "period": "Period 1",
                    "instructor": "S AKHIL TEJ",
                    "subject": "Construction Planning and Project Management"
                },
                {
                    "period": "Period 2",
                    "instructor": "C BALA HUSSAINY",
                    "subject": "Soil Mechanics Lab"
                },
                {
                    "period": "Period 3",
                    "instructor": "T SUHARIKA PAUL",
                    "subject": "Engineering Geology"
                },
                {
                    "period": "Period 4",
                    "instructor": "Dr SYED AFZAL BASHA",
                    "subject": "Gender Sensitization"
                },
                {
                    "period": "Period 5",
                    "instructor": "S AKHIL TEJ",
                    "subject": "Construction Planning and Project Management"
                },
                {
                    "period": "Period 6",
                    "instructor": "T SUHARIKA PAUL",
                    "subject": "Engineering Geology"
                }
            ],
            "Thursday": [
                {
                    "period": "Period 1",
                    "instructor": "Dr SYED AFZAL BASHA",
                    "subject": "Gender Sensitization"
                },
                {
                    "period": "Period 2",
                    "instructor": "C BALA HUSSAINY",
                    "subject": "Geotechnical Engineering"
                },
                {
                    "period": "Period 3",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 4",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering"
                },
                {
                    "period": "Period 5",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering"
                },
                {
                    "period": "Period 6",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                }
            ],
            "Friday": [
                {
                    "period": "Period 1",
                    "instructor": "C BALA HUSSAINY",
                    "subject": "Soil Mechanics Lab"
                },
                {
                    "period": "Period 2",
                    "instructor": "C BALA HUSSAINY",
                    "subject": "INTRODUCTION TO INTERNET OF THINGS"
                },
                {
                    "period": "Period 3",
                    "instructor": "T SUHARIKA PAUL",
                    "subject": "Engineering Geology"
                },
                {
                    "period": "Period 4",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 5",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 6",
                    "instructor": "T SUHARIKA PAUL",
                    "subject": "Engineering Geology"
                }
            ],
            "Saturday": [
                {
                    "period": "Period 1",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering"
                },
                {
                    "period": "Period 2",
                    "instructor": "S AKHIL TEJ",
                    "subject": "Construction Planning and Project Management"
                },
                {
                    "period": "Period 3",
                    "instructor": "T SUHARIKA PAUL",
                    "subject": "Engineering Geology"
                },
                {
                    "period": "Period 4",
                    "instructor": "Dr SYED AFZAL BASHA",
                    "subject": "Gender Sensitization"
                },
                {
                    "period": "Period 5",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                },
                {
                    "period": "Period 6",
                    "instructor": "M Lokanath Reddy",
                    "subject": "Environmental Engineering Lab"
                }
            ]                
            }
        },
        "CSE": {
          "A": {
              "Monday": [
                  {
                      "period": "Period 1",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "V Lilly Grace",
                      "subject": "INTRODUCTION TO IOT"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE"
                  }
              ],
              "Tuesday": [
                  {
                      "period": "Period 1",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "V Lilly Grace",
                      "subject": "INTRODUCTION TO IOT"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE"
                  }
              ],
              "Wednesday": [
                  {
                      "period": "Period 1",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "DR M.SRI LAKSHMI",
                      "subject": "COMPUTER NETWORKS"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "V Lilly Grace",
                      "subject": "INTRODUCTION TO IOT"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  }
              ],
              "Thursday": [
                  {
                      "period": "Period 1",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "DR M.SRI LAKSHMI",
                      "subject": "COMPUTER NETWORKS"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "DR M.SRI LAKSHMI",
                      "subject": "COMPUTER NETWORKS"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  }
              ],
              "Friday": [
                  {
                      "period": "Period 1",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE"
                  }
              ],
              "Saturday": [
                  {
                      "period": "Period 1",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  }
              ]
          },
          "B": {
              "Monday": [
                  {
                      "period": "Period 1",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  }
              ],
              "Tuesday": [
                  {
                      "period": "Period 1",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "B. Sowjanya",
                      "subject": "MANAGEMENT INFORMATION SYSTEMS"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "B. Sowjanya",
                      "subject": "MANAGEMENT INFORMATION SYSTEMS"
                  }
              ],
              "Wednesday": [
                  {
                      "period": "Period 1",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "B. Sowjanya",
                      "subject": "MANAGEMENT INFORMATION SYSTEMS"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "V Lilly Grace",
                      "subject": "INTRODUCTION TO IOT"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  }
              ],
              "Thursday": [
                  {
                      "period": "Period 1",
                      "instructor": "V Vijaya Chandra Rao",
                      "subject": "ETHICAL HACKING-1"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "DR M.SRI LAKSHMI",
                      "subject": "COMPUTER NETWORKS"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "V Lilly Grace",
                      "subject": "INTRODUCTION TO IOT"
                  }
              ],
              "Friday": [
                  {
                      "period": "Period 1",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "B. Sowjanya",
                      "subject": "MANAGEMENT INFORMATION SYSTEMS"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  }
              ],
              "Saturday": [
                  {
                      "period": "Period 1",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT LAB"
                  },
                  {
                      "period": "Period 2",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  },
                  {
                      "period": "Period 3",
                      "instructor": "D.Jayanarayana Reddy",
                      "subject": "ARTIFICIAL INTELLIGENCE LAB"
                  },
                  {
                      "period": "Period 4",
                      "instructor": "C K Indira",
                      "subject": "MOBILE APPLICATION DEVELOPMENT"
                  },
                  {
                      "period": "Period 5",
                      "instructor": "T N BALAKRISHNA",
                      "subject": "R PROGRAMMING"
                  },
                  {
                      "period": "Period 6",
                      "instructor": "K MANJUSHA",
                      "subject": "GENDER SENSITIZATION"
                  }
              ]
          }
      },
       
    }
      ])


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    // const handleChangeform = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
  // The function to handle form changes
const handleChangeform = (e:any) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value, // Dynamically update the formData based on the input's name and value
  }));
};
    const handleSubmit = () => {
      if (formData.academicYear && formData.semester) {
        setShowTable(true);
        setErrorMessage(""); // Clear any previous error
      } else {
        setShowTable(false);
        setErrorMessage("An error has occurred. Please fill in the required fields.");
      }

    };
    
  return (
<>
<Layout>
<Box sx={{ margin: 2 }}>
<Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>
  Generate Student Timetable
</Typography>
<Typography variant="body1" paragraph>
  Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
</Typography>

<Grid container spacing={2}>
      {/* Academic Year Dropdown */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Academic Year</InputLabel>
          <Select
            label="Academic Year"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChangeform}
          >
            {Array.from({ length: 15 }, (_, i) => 2023 + i).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Semester Dropdown */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Semester</InputLabel>
          <Select
            label="Semester"
            name="semester"
            value={formData.semester}
            onChange={handleChangeform}
          >
            <MenuItem value="1st Semester">1st Semester</MenuItem>
            <MenuItem value="2nd Semester">2nd Semester</MenuItem>
            <MenuItem value="3rd Semester">3rd Semester</MenuItem>
            <MenuItem value="4th Semester">4th Semester</MenuItem>
            <MenuItem value="5th Semester">5th Semester</MenuItem>
            <MenuItem value="6th Semester">6th Semester</MenuItem>
            <MenuItem value="7th Semester">7th Semester</MenuItem>
            <MenuItem value="8th Semester">8th Semester</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12} sm={6} md={4} sx={{display:"flex",alignItems:"center"}}>
        {/* <Button variant="contained"  sx={{backgroundColor:"#FF6500","&:hover": {backgroundColor: "#ff934c"}}} onClick={handleSubmit}>
          Submit
        </Button> */}
        <CustomButton onClick={handleSubmit} sx={{ }}>Submit</CustomButton>
            
      </Grid>
    </Grid>
    </Box>
    {showTable && (
       <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab  label="Civil" value="1" sx={{fontWeight:"bold"}}   />
          <Tab  label="CES"  value="2"  sx={{fontWeight:"bold"}} />
          </TabList>
        </Box>
        <TabPanel value="1">   
              <Timetable timetableData={timetableData[0]["CIVIL"]} />  
        </TabPanel >
        <TabPanel value="2">   
              <Timetable timetableData={timetableData[0]["CSE"]} /> 
        </TabPanel >
        </TabContext>
    </Box>
      )}

</Layout>

</>
      )
}

export default page