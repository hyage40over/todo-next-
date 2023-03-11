import * as React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';







function TimeSelect() {
  const [time, setTime] = React.useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Time"
          onChange={handleChange}
        >
        {[...Array(24)].map((_, i) => {
          return (
            <MenuItem value={i}>{i}</MenuItem>
          );
        })}
        </Select>
      </FormControl>
    </Box>
  );
}


function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (test) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="ToDo-imput">
          {"Imput ToDo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="test">
            日付とToDoを入力してください
          </DialogContentText>
          <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <TimeSelect />
            <TextField id="outlined-basic" label="ToDo" variant="outlined" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


function IconButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="previous">
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton aria-label="next">
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  );
}


function createData(hour, todo1, todo2, todo3, todo4, todo5, todo6, todo7) {
  return { hour, todo1, todo2, todo3, todo4, todo5, todo6, todo7 };
}

const rows = [];
for (let i = 0; i < 24; i++) {
    rows.push(createData(i, '', '', '', '', '', '', ''));
}

export default function Home() {
  return (
    <Container>
        <IconButtons />
        <AlertDialog />

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>時間</TableCell>
                        <TableCell>月</TableCell>
                        <TableCell>火</TableCell>
                        <TableCell>水</TableCell>
                        <TableCell>木</TableCell>
                        <TableCell>金</TableCell>
                        <TableCell>土</TableCell>
                        <TableCell>日</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.hour}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.hour}
                    </TableCell>
                    <TableCell>{row.todo1}</TableCell>
                    <TableCell>{row.todo2}</TableCell>
                    <TableCell>{row.todo3}</TableCell>
                    <TableCell>{row.todo4}</TableCell>
                    <TableCell>{row.todo5}</TableCell>
                    <TableCell>{row.todo6}</TableCell>
                    <TableCell>{row.todo7}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}