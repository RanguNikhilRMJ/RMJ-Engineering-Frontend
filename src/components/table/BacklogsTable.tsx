import React, { useState } from 'react';
import {Grid,Card,CardHeader,CardContent,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,useTheme,Dialog,AppBar,Toolbar,IconButton,Button,DialogTitle,DialogContent,Box} from '@mui/material';
import Image from 'next/image'

import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';

interface BacklogsTableProps {
  headers: string[];
  data: { [key: string]: string }[];
  hedding: string;
  subHedding: string;
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BacklogsTable: React.FC<BacklogsTableProps> = ({
  headers,
  data,
  hedding,
  subHedding
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[3], backgroundColor: "#f9f9f9" }}>
      <Grid container>
        <Grid item xs={9}>
          <CardHeader
            title={<Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>{hedding}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">{subHedding}</Typography>}
          />
        </Grid>
        <Grid item xs={3}>
          <div onClick={handleClickOpen} style={{ width: "80px", height: "30px", border: "1px solid black", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>More▽</Typography>
          </div>
        </Grid>
      </Grid>

      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor: "rgb(46 32 59)" }}>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ color: "white",fontWeight:"bold" }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>{row[header.toLowerCase()]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "rgb(55, 65, 81)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {hedding}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle>{hedding}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {hedding}
          </Typography>
           {/* {errorMessage ? ( */}
           <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
                    <Image
                src="/nodataAim.svg"
                width={300}
                    height={300}
                    alt="Picture of the author"
                  />
             
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="error">
                  {/* {errorMessage} */}
                </Typography>
              </div>
            </Box>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>

    </Card>
  );
};

export default BacklogsTable;