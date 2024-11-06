import React from 'react';

import { Tabs, Tab, Box } from '@mui/material';
 
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

      id={`tabpanel-${index}`}

      aria-labelledby={`tab-${index}`}

      {...other}
>

      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
</div>

  );

}
 
function a11yProps(index: number) {

  return {

    id: `tab-${index}`,

    'aria-controls': `tabpanel-${index}`,

  };

}
 
const OfficeSubmissions: React.FC = () => {

  const [value, setValue] = React.useState(0);
 
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {

    setValue(newValue);

  };
 
  return (
<Box sx={{ width: '100%' }}>
<Tabs value={value} onChange={handleChange} aria-label="office submissions tabs">
<Tab label="Expenditure" {...a11yProps(0)} />
<Tab label="Bank Deposits" {...a11yProps(1)} />
<Tab label="Hand Over" {...a11yProps(2)} />
</Tabs>
<TabPanel value={value} index={0}>

        {/* Content for Expenditure */}

        Expenditure Content
</TabPanel>
<TabPanel value={value} index={1}>

        {/* Content for Bank Deposits */}

        Bank Deposits Content
</TabPanel>
<TabPanel value={value} index={2}>

        {/* Content for Hand Over */}

        Hand Over Content
</TabPanel>
</Box>

  );

};
 
export default OfficeSubmissions;

 