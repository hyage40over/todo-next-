import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import { useAuthContext } from "../src/context/AuthContext"
import Stack from '@mui/material/Stack';


export default function SettingDialog({isOpen, onClickClose}) {
  const { user } = useAuthContext()
  //const router = useRouter()
  const handleClickUpdateAccount = async () => {
    //await signOut(auth)
    //await router.push("/login")
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
            <TextField id="outlined-basic" label="名前" variant="outlined" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>キャンセル</Button>
          <Button onClick={handleClickUpdateAccount} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
