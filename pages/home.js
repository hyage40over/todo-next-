import * as React from 'react';
import Container from '@mui/material/Container';
import { useAuthContext } from "../src/context/AuthContext"

import Button from '@mui/material/Button';

import LogOffDialog from "../components/LogOffDialog"
import SettingDialog from "../components/SettingDialog"
//import InputDialog from "../components/InputDialog"

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import TextField from '@mui/material/TextField';
import { Scheduler, useScheduler } from "@aldabil/react-scheduler";

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

import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { bool } from 'prop-types';

import { query, where } from "firebase/firestore";


//import { EVENTS } from "./events";

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
  const scheduler = useScheduler();
  const setEvents = scheduler.setEvents;

  const initSchedule = async () => {
    // fireStoreからDBを取得
    const snapshot = await getDocs(collection(db, "schedules"));
    const firestoreResponse = [];
    snapshot.forEach((doc) => {
      firestoreResponse.push({
        event_id: doc.id,
          title: doc.data().title,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
      })
    });
    setEvents(firestoreResponse);
  }
  React.useEffect(() => {
    initSchedule();
  }, [])
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

  // handle Confirm
  const handleConfirm = async (
    event,
    action
  ) => {

    console.log("event.event_id =", event.event_id);
    console.log("event.start =", event.start);
    console.log("event.end =", event.end);

    var isFail = await true
    if (action === "edit") {
      /** PUT event to remote DB */
      const docRef = await doc(db, "schedules", String(event.event_id));

      //console.log("event_id = ", String(event.event_id))
      console.log("edit")


      try {
        await updateDoc(docRef, {
          start: event.start,
          end: event.end,
          title: event.title
        });
        isFail = false
        console.log("Document edited with ID:: ", docRef.id);
      } catch (e) {
        console.error("Error editting document: ", e);
      }




    } else if (action === "create") {

      console.log("create")

      /**POST event to remote DB */
      try {
        const docRef = await addDoc(collection(db, "schedules"), {
          start: event.start,
          end: event.end,
          title: event.title
        });
        isFail = false
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }


    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((resolv, reject) => {

      // Make it slow 
      setTimeout(() => {
        if (isFail) {
          reject("Ops... Faild");
        } else {
          resolv({
            ...event,
            event_id: event.event_id || Math.random()
          });
        }
      }, 3000);
    });
  };

  // handle EventDrop
  const handleEventDrop = async (
    droppedOn, 
    updatedEvent, 
    originalEvent
  ) => {

    //console.log("droppedOn =", droppedOn);
    console.log("updatedEvent.start =", updatedEvent.start);
    console.log("updatedEvent.end =", updatedEvent.end);
    //console.log("originalEvent =", originalEvent);
    console.log("event_id = ", updatedEvent.event_id)

    var isFail = await true
    //const docRef = await db.collection('schedules').doc('updatedEvent.event_id')
    const docRef = await doc(db, "schedules", String(originalEvent.event_id));
    //const docRef = await query(collection(db, "schedules"), where("event_id", "==", String(updatedEvent.event_id)));

    try {
      /*
      await docRef.update({
        start: updatedEvent.start,
        end: updatedEvent.end,
        title: originalEvent.title
      })
      */
      await updateDoc(docRef, {
        start: updatedEvent.start,
        end: updatedEvent.end,
        title: originalEvent.title
      });
      isFail = false
      console.log("Document updated with ID: ", docRef.id)
    } catch (e) {
      console.error("Error updating document: ", e);
    }

    return new Promise((resolv, reject) => {

      // Make it slow
      setTimeout(() => {
        if (isFail) {
          reject("Ops... Faild");
        } else {
          resolv({
            ...updatedEvent,
            event_id: updatedEvent.event_id || Math.random()
          });
        }
      }, 3000);
    })
  }  

  // handle delete
  const handleDelete = async (
    id
  ) => {
    await deleteDoc(doc(db, "schedules", String(id)));
    console.log("id =", id);

    return new Promise((res) => {
      setTimeout(() => {
        res(id);
      }, 3000);
    });
  }      

  return (
    <Container>
        <div align="right">
          <InputWithIcon />
          <AccountMenu onClickLogout={handleClickLogoutOpen} onClickSetting={handleClickSettingOpen} />
          <LogOffDialog isOpen={openLogout} onClickClose={handleCloseLogout} />
          <SettingDialog isOpen={openSetting} onClickClose={handleCloseSetting} />
          {/*<InputDialog />*/}
        </div>
        <Scheduler
            //disableViewNavigator = {false}
            //navigationPickerProps = {"renderInput"}
            locale={ja}
            onConfirm={handleConfirm}
            onEventDrop={handleEventDrop}
            onDelete={handleDelete}
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
            // events={events}
          />
    </Container>
  );
}