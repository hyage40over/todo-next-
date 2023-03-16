import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

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
import { Scheduler } from "@aldabil/react-scheduler";
import ja from 'date-fns/locale/ja'

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

function InputDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (test) => {
    setOpen(false);
  };

  return (
    <div align="right">
      <Button variant="outlined" onClick={handleClickOpen}>
        ToDo入力
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

function LogOffDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (test) => {
    setOpen(false);
  };
  return (
    <div align="right">
      <Button variant="outlined" onClick={handleClickOpen}>
        サインアウト
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="ToDo-imput">
          {"LOGOUT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="test">
            ログアウトしますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Home() {
  return (
    <Container>
        <LogOffDialog />
        <InputDialog />
        <Scheduler
            locale={ja}
            view="week"
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 0,
              startHour: 9,
              endHour: 17,
              step: 60,
              cellRenderer: ({ height, start, onClick, ...props }) => {
                // Fake some condition up
                const hour = start.getHours();
                const disabled = hour === 12;
                const restProps = disabled ? {} : props;
                return (
                  <Button
                    style={{
                      height: "100%",
                      background: disabled ? "#eee" : "transparent",
                      cursor: disabled ? "not-allowed" : "pointer"
                    }}
                    onClick={() => {
                      if (disabled) {
                        return alert("Opss");
                      }
                      onClick();
                    }}
                    disableRipple={disabled}
                    // disabled={disabled}
                    {...restProps}
                  ></Button>
                );
              }
            }}
            events={[
              {
                event_id: 1,
                title: "Event 1",
                start: new Date("2023/3/14 09:30"),
                end: new Date("2023/3/14 10:30"),
              },
              {
                event_id: 2,
                title: "Event 2",
                start: new Date("2023/3/14 10:00"),
                end: new Date("2023/3/14 11:00"),
              },
            ]}
          />
    </Container>
  );
}