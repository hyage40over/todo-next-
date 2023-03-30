import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useRouter } from "next/router"
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, currentUser } from "firebase/auth";
import { auth } from "../firebase/init"
import { signOut, updateEmail } from "firebase/auth"

export default function SettingDialog({isOpen, onClickClose}) {
  const router = useRouter()
  const user = auth.currentUser;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.email);

  console.log("user----------", user);
  console.log("password----------", password);

  const handleDeleteUser = async () => {
    //const userr = await currentUser
    const credential = await EmailAuthProvider.credential(
      user.email, // ←ここに入力されたメールアドレス
      password // ←ここに入力されたパスワード
    )
    await reauthenticateWithCredential(user, credential)
    deleteUser(user).then(() => {
      signOut(auth)
      router.push("/signup")      
    }).catch((error) => {
      console.log(error)
    });
  };


  const handleClickUpdateAccount = async () => {
    const credential = await EmailAuthProvider.credential(
      user.email, // ←ここに入力されたメールアドレス
      password // ←ここに入力されたパスワード
    )

    await reauthenticateWithCredential(user, credential)
    //await updatePassword(user, newPassword)
    try {
      await updateEmail(user, email)
    } catch(error) {
      console.log(error)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }


  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

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
            <TextField id="email" label="e-mail" variant="outlined" value={email} onChange={handleEmailChange}/>
            <TextField id="password" label="パスワード" variant="outlined" type="password" value={password} onChange={handlePasswordChange} />
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
