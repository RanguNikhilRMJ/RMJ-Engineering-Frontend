import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  useTheme,
} from '@mui/material';

interface TableData {
  title: string;
  identifier: string;
  year: string;
  journal?: string; // Only for Research Publications
}

const patentsData: TableData[] = [
  {
    title: 'Automated Irrigation System for Smart Farms',
    identifier: 'US12345678',
    year: '2019',
  },
  {
    title: 'Intelligent Traffic Management System',
    identifier: 'US87654321',
    year: '2017',
  },
  {
    title: 'Personalized Recommendation Engine for E-commerce',
    identifier: 'US98765432',
    year: '2015',
  },
];

const researchPublicationsData: TableData[] = [
  {
    title: 'Innovative Approaches to Sustainable Energy Solutions',
    identifier: '',
    year: '2022',
    journal: 'Journal of Renewable Energy',
  },
  {
    title: 'Advancements in Machine Learning for Image Recognition',
    identifier: '',
    year: '2021',
    journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
  },
  {
    title: 'Exploring the Potential of Blockchain Technology in Supply Chain Management',
    identifier: '',
    year: '2020',
    journal: 'International Journal of Production Economics',
  },
];

const TableCard: React.FC<{ title: string; description: string; data: TableData[] }> = ({ title, description, data }) => (
  <Card >
    <CardHeader
      title={<Typography variant="h5" color="text.primary" sx={{fontWeight:"bold"}} >{title}</Typography>}
      subheader={<Typography variant="body2" color="text.secondary">{description}</Typography>}
    />
    <CardContent>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor: "rgb(46 32 59)"}}>
            <TableRow>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Title</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Identifier</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Year</TableCell>
              {data.some(item => !!item.journal) && <TableCell sx={{fontWeight:"bold",color:"white"}}>Journal</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                {row.title}
                </TableCell>
                <TableCell>{row.identifier}</TableCell>
                <TableCell>{row.year}</TableCell>
                {row.journal && <TableCell>{row.journal}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

const Patents: React.FC = () => {
  const [tabValue, setTabValue] = useState('patents'); // Initial tab value for Patents
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Card   sx={{boxShadow: theme.shadows[3]  ,backgroundColor:"#f9f9f9"  }}>
      <CardHeader
        title={<Typography variant="h5" color="text.primary" sx={{fontWeight:"bold"}}>Research Data</Typography>}
        subheader={<Typography variant="body2" color="text.secondary">View your patents and research publications.</Typography>}
      />
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="data tabs">
            <Tab label="Patents" value="patents" />
            <Tab label="Research Publications" value="publications" />
          </Tabs>
        </Box>
        {tabValue === 'patents' && (
          <TableCard
            title="Patents"
            description="View your registered patents."
            data={patentsData}
          />
        )}
        {tabValue === 'publications' && (
          <TableCard
            title="Research Publications"
            description="View your published research."
            data={researchPublicationsData}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Patents;
