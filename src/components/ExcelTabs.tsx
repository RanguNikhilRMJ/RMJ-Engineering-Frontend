import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { readExcelFileAsTables } from '../utils/excelUtils'; // Adjust the path as needed

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ExcelTabs: React.FC = () => {
  const [value, setValue] = useState(0);
  const [tables, setTables] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    async function fetchData() {
      const excelTables = await readExcelFileAsTables('/placement data.xlsx'); // Replace with your file name
      setTables(excelTables);
    }

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="excel tabs">
        {Object.keys(tables).map((sheetName, index) => (
          <Tab label={sheetName} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
      {Object.keys(tables).map((sheetName, index) => (
        <TabPanel value={value} index={index} key={index}>
 <table style={{ border: "1px solid black", width: "100%" }}>

            <thead>
              <tr>
                {tables[sheetName][0]?.map((header: string, index: number) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tables[sheetName].slice(1).map((row, rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
      ))}
    </Box>
  );
};

export default ExcelTabs;