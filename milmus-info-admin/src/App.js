import logo from './logo.svg';
import './App.css';
import { Button, Input, TextField } from '@mui/material';
import { db } from "./firebase_setup/firebase";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import {uid} from 'uid'
import { AiFillDelete } from 'react-icons/ai'


function App() {

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])

  const writeMessage = (pTitle, pMessage) => {
    console.log('test')
    const uuid = uid();

    set(ref(db, `/${uuid}`), {
      pTitle,
      pMessage,
      uuid
    });

    console.log('sending')
  }
  
  const pushSend = () => {
    console.log('fdasfd')
    writeMessage(title, message);

    setMessage('');
    setTitle('');
  }

  useEffect(() => {
    
    onValue(ref(db), snapshot => {
      setMessageList([])
      const data = snapshot.val();

      if(data !== null){
        Object.values(data).map(msg => {
          setMessageList((oldArr) => [...oldArr, msg])
        })
      }
    })
  }, [])

  return (
    <div style={{
      alignItems:'center',
      justifyContent:'center'
      }}
      >
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
        }}
      >
        <TextField variant='outlined' style={{margin:'5px'}} placeholder='Titel' value={title} onChange={(e) => setTitle(e.target.value)}>Titel</TextField>
        <Button variant='outlined' style={{margin:'5px'}} onClick={pushSend} disabled={message === '' || title === ''}>Send</Button>
      </div>

    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    }}
    >
      <TextField placeholder='Nähere Infos' variant='outlined' fullWidth multiline minRows={3} style={{maxWidth:'30%'}} value={message} onChange={(e) => setMessage(e.target.value)}></TextField>
      
    </div>
    
    <div
    style={{
      alignItems:'center',
      justifyContent:'center'
      }}>

      {messageList.map((msg) => (
        <div style={{
          borderWidth: 'medium',
          borderStyle: 'dashed',
          margin: '5px',
          marginLeft: '10%',
          marginRight: '10%',
          textAlign: 'center'
        }}>
          <div
            style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
            }}>
            <div
            style={{
              minWidth:'400px'
            }}
            >
              <h1>{msg.pTitle}</h1>
              {msg.pMessage}
            </div>
            
            <Button variant='outlined'>
              <AiFillDelete/>
            </Button>
            
          </div>

        </div>
      ))}
    </div>
    
  </div>
  )

}

export default App;
