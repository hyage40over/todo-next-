import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../firebase/init"
import { updateEmail } from "firebase/auth"

import Collapse from '@mui/material/Collapse';

const ErrorMessageAlert = (props) => {
  var isopen
  if (props.errorMessage == "") {
    isopen = false
    return
  }else{
    isopen = true
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isopen}>
        <Alert
          severity={props.type}
          sx={{ mb: 2 }}
        >
          {props.errorMessage}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default function EmailChange({isOpen, onClickClose}) {
  const user = auth.currentUser;
  const [errorMessage, setErrorMessage] = useState("");
  const [newemail, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [msgtype, setMsgtype] = useState("");
  
  const handlenewEmailChange = (e) => {
    setErrorMessage("")
    setMsgtype("info")
    setEmail(e.target.value)
  }
  const handlePassword1Change = (e) => {
    setErrorMessage("")
    setMsgtype("info")
    setPassword1(e.target.value)
  }
  const handlePassword2Change = (e) => {
    setErrorMessage("")
    setMsgtype("info")
    setPassword2(e.target.value)
  }
  const handleChangePassword = async () => {
    setErrorMessage("")
    setMsgtype("info")
    if (password1 === password2){
      try {
        const credential = await EmailAuthProvider.credential(
          user.email, // ←ここに入力されたメールアドレス
          password1 // ←ここに入力されたパスワード
        )
        await reauthenticateWithCredential(user, credential)
        updateEmail(auth.currentUser, newemail).then(() => {
          setErrorMessage("E-Mailを変更しました");
          setMsgtype("success")
        }).catch((error) => {
          console.log("errorCode: ", error.code);
          console.log("errorMessage: ", error.message);
          setErrorMessage(error.message);
          setMsgtype("error")
        });
      } catch (error) {
        setErrorMessage(error.message);
        setMsgtype("error")
        console.error("Error adding document: ", error);
      }
    }else{
      console.log("パスワードが一致しません")
      setErrorMessage("パスワードが一致しません");
      setMsgtype("error")

    }
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        >
        <DialogTitle id="Setting">
          {"アカウントのE-Mail変更"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Setting-text">
            アカウント{user?.email}のE-Mailを変更します。
          </DialogContentText>
          <Stack spacing={5}>
            <InputLabel>確認用にパスワードを入力してください<br/></InputLabel>
            <TextField id="newemail" label="新しいE-Mail" variant="outlined" value={newemail} onChange={handlenewEmailChange}/>
            <TextField id="password1" label="パスワード" variant="outlined" type="password" value={password1} onChange={handlePassword1Change}/>
            <TextField id="password2" label="確認用" variant="outlined" type="password" value={password2} onChange={handlePassword2Change}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}>閉じる</Button>
          <Button onClick={handleChangePassword} autoFocus>
            E-Mailの更新
          </Button>
        </DialogActions>
        <ErrorMessageAlert type={msgtype}  errorMessage={errorMessage} />
      </Dialog>
    </div>
  );
}