import * as React from 'react';
import Router from 'next/router'
import Container from '@mui/material/Container';
import { useAuthContext } from "../src/context/AuthContext"

import Button from '@mui/material/Button';
import LogOffDialog from "../components/LogOffDialog"

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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/init";

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
        <MenuItem onClick={onClickSetting}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
          アカウント設定
        </MenuItem>
        <MenuItem onClick={onClickLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function InputWithIcon() {
  const { user } = useAuthContext()
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="outlined-read-only-input"
        style = {{width: 350}}
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
  const { user } = useAuthContext();
  const [openLogout, setOpenLogout] = React.useState(false);
  const scheduler = useScheduler();
  const setEvents = scheduler.setEvents;

  const initSchedule = async () => {
    if (!user) {
      return;
    }
    // fireStoreからDBを取得
    const q = await query(collection(db, "schedules"), where("uid", "==", user?.uid));
    const snapshot = await getDocs(q);

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
  }, [user])
  const handleClickLogoutOpen = () => {
    setOpenLogout(true);
    console.log("Logout")
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const handleClickSettingOpen = () => {
    // setOpenSetting(true);
    Router.push("/setting");
  };

  console.log("home user------", user);

  // handle Confirm
  const handleConfirm = async (
    event,
    action
  ) => {
    var tmp_id = await 0;
    var isFail = await true;

    if (action === "edit") {
      /** PUT event to remote DB */
      const docRef = await doc(db, "schedules", String(event.event_id));
      console.log("edit")

      try {
        await updateDoc(docRef, {
          start: event.start,
          end: event.end,
          title: event.title
        });
        isFail = false
        console.log("Document edited with ID:: ", docRef.id);
        tmp_id = docRef.id
      } catch (e) {
        console.error("Error editting document: ", e);
      }

    } else if (action === "create") {
      console.log("create")

      /**POST event to remote DB */
      try {
        const user = await auth.currentUser;
        const docRef = await addDoc(collection(db, "schedules"), {
          uid: user.uid,
          start: event.start,
          end: event.end,
          title: event.title
        });
        isFail = false
        console.log("Document written with ID: ", docRef.id);
        tmp_id = docRef.id

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
            event_id: tmp_id || Math.random()
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

    console.log("updatedEvent.start =", updatedEvent.start);
    console.log("updatedEvent.end =", updatedEvent.end);
    console.log("event_id = ", updatedEvent.event_id)

    var isFail = await true
    const docRef = await doc(db, "schedules", String(originalEvent.event_id));

    try {
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
        </div>
        <Scheduler
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
                    {...restProps}
                  ></Button>
                );
              }
            }}
          />
    </Container>
  );
}