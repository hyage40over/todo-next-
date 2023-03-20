import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useRouter } from "next/router"
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/init"

export default function SettingDialog({isOpen, onClickClose}) {
  const router = useRouter()
  const user = auth.currentUser;
  const handleClickUpdateAccount = async () => {

  };
  const handleDeleteUser = async () => {
    deleteUser(user).then(() => {
      // User deleted.
      //signOut(auth)
      router.push("/signup")
  
    }).catch((error) => {

      console.log(error)
      // An error ocurred
      // ...
    });
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        >
        <DialogTitle id="Setting">
          {"Account Setting"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Setting-text">
          {user?.email}のアカウント設定
          </DialogContentText>
          <Stack spacing={2}>
            <TextField id="email" label="e-mail" variant="outlined" defaultValue={user?.email} />
            <TextField id="password" label="パスワード" variant="outlined" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>キャンセル</Button>
          <Button onClick={handleClickUpdateAccount} autoFocus>
            更新
          </Button>
          <Button onClick={handleDeleteUser} autoFocus>
            アカウント削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
