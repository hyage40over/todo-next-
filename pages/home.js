import * as React from 'react';
import Container from '@mui/material/Container';
import { useAuthContext } from "../src/context/AuthContext"

import Button from '@mui/material/Button';

import LogOffDialog from "../components/LogOffDialog"
import SettingDialog from "../components/SettingDialog"
import InputDialog from "../components/InputDialog"

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import { Scheduler } from "@aldabil/react-scheduler";

import ja from 'date-fns/locale/ja'

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Menu from '@mui/material/Menu';

import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function AccountMenu({onClickLogout, onClickSetting}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: undefined, alignItems: undefined, textAlign: undefined }} >
        {/*<Typography sx={{ minWidth: 100 }}>Contact</Typography>*/}
        {/*<Typography sx={{ minWidth: 100 }}>Profile</Typography>*/}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 100, height: 64 }}>Account Menu</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={onClickSetting}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={onClickLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function InputWithIcon() {
  const { user } = useAuthContext()
  console.log("user---------", user);
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="outlined-read-only-input"
        label="アカウント"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        //userがない場合は代入しない
        value={user?.email}
      />
    </Box>
  );
}

export default function Home() {
  const [openLogout, setOpenLogout] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);

  const handleClickLogoutOpen = () => {
    setOpenLogout(true);
    console.log("Logout")


  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleClickSettingOpen = () => {
    setOpenSetting(true);
    console.log("Setting")

  };
  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  return (
    <Container>
        <div align="right">
          <InputWithIcon />
          <AccountMenu onClickLogout={handleClickLogoutOpen} onClickSetting={handleClickSettingOpen} />
          <LogOffDialog isOpen={openLogout} onClickClose={handleCloseLogout} />
          <SettingDialog isOpen={openSetting} onClickClose={handleCloseSetting} />
          <InputDialog />
        </div>
        <Scheduler
            //disableViewNavigator = {false}
            //navigationPickerProps = {"renderInput"}
            locale={ja}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 0,
              startHour: 9,
              endHour: 17,
              step: 60,
              // navigation: true,
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