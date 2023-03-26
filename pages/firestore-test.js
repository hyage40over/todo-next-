import * as React from 'react';
import Button from '@mui/material/Button';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/init"

export default function FirestoreTest() {
  const handleClickAddData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <>
      <Button variant="text" onClick={handleClickAddData}>データ登録</Button>
    </>
  );
}
