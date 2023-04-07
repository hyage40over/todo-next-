import { useRouter } from "next/router"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/init"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LogOffDialog({isOpen, onClickClose}) {
  const router = useRouter()
  const handleClickLogout = async () => {
    console.log("handleClickLogout")
    //await signOut(auth)
    await signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((err) => {
        console.log(err.message);
      });

  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
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
          <Button onClick={onClickClose}>キャンセル</Button>
          <Button onClick={handleClickLogout} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
