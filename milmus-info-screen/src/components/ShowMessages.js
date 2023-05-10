import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { onValue, ref, set } from "firebase/database";
import {db} from "./../firebase/firebase"

const ShowMessages = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        onValue(ref(db), snapshot => {
            setMessages([])
            const data = snapshot.val();

            if(data !== null){
                Object.values(data).map(msg => {
                    setMessages((oldArr) => [...oldArr,msg])
                })
            }
        })
    }, [])

    return (
        <div
    style={{
      alignItems:'center',
      justifyContent:'center'
      }}>

      {messages.sort((a,b) => a.postedOn < b.postedOn ? 1 : -1).map((msg) => (
        <div style={{
          borderWidth: 'medium',
          borderStyle: 'dashed',
          borderColor: 'lightblue',
          borderRadius: '15px',
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
                <div style={{
                    fontSize: '30px'
                }}>
                    {msg.pTitle}
                </div>

                
                {msg.pMessage}
            </div>
            
          </div>

        </div>
      ))}
    </div>
    )
}

export default ShowMessages;