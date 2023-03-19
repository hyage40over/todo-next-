import { useRouter } from "next/router"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/init"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SettingDialog({isOpen, onClickClose}) {
  const router = useRouter()
  const handleClickDeleteAccount = async () => {
    await signOut(auth)
    await router.push("/login")
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
      >
        <DialogTitle id="Setting">
          {"LOGOUT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Setting-text">
            アカウントを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>キャンセル</Button>
          <Button onClick={handleClickDeleteAccount} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
