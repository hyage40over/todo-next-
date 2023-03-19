import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SettingDialog({isOpen, onClickClose}) {
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
            アカウント設定を更新しますか？
          </DialogContentText>
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
